const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function stripTime(date) {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

const commentSchema = new Schema({
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const IssueSchema = new Schema(
    {
        key: { type: String, required: true, unique: true }, // e.g., PRJ-123
        title: { type: String, required: true },
        description: { type: String, required: true },
        type: { type: String, enum: ['story', 'task', 'bug', 'epic'], required: true },
        status: { type: String, required: true },
        priority: { type: String, enum: ['highest', 'high', 'medium', 'low', 'lowest'], required: true },
        assignee: { type: Schema.Types.ObjectId, ref: 'User' },
        reporter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
        sprint: { type: Schema.Types.ObjectId, ref: 'Sprint' },
        epic: { type: Schema.Types.ObjectId, ref: 'Issue' }, // Reference to parent epic if this is a story
        storyPoints: { type: Number },
        originalEstimate: { type: Number }, // in hours
        remainingEstimate: { type: Number }, // in hours
        timeSpent: { type: Number }, // in hours
        labels: [{ type: String }],
        components: [{ type: String }],
        comments: [commentSchema],
        attachments: [{
            filename: String,
            path: String,
            uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
            uploadedAt: { type: Date, default: Date.now }
        }],
        watchers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        dueDate: { type: Date, set: stripTime },
        createdAt: { type: Date, default: Date.now, set: stripTime },
        updatedAt: { type: Date, default: Date.now, set: stripTime }
    },
    { timestamps: true }
);

// Add index for faster querying
IssueSchema.index({ key: 1 });
IssueSchema.index({ project: 1 });
IssueSchema.index({ sprint: 1 });
IssueSchema.index({ type: 1 });
IssueSchema.index({ status: 1 });

module.exports = mongoose.model('Issue', IssueSchema);
