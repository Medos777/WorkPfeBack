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
        status: { 
            type: String, 
            enum: ['todo', 'inprogress', 'done'],
            required: true,
            default: 'todo'
        },
        priority: { type: String, enum: ['highest', 'high', 'medium', 'low', 'lowest'], required: true },
        assignee: { type: Schema.Types.ObjectId, ref: 'User' },
        reporter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
        epic: { type: Schema.Types.ObjectId, ref: 'Issue' }, // Reference to parent epic if this is a story
        storyPoints: { 
            type: Number,
            min: [1, 'Story points must be at least 1'],
            max: [100, 'Story points cannot exceed 100']
        },
        originalEstimate: { 
            type: Number,
            min: [0, 'Original estimate cannot be negative'],
            max: [10000, 'Original estimate cannot exceed 10000 hours']
        },
        remainingEstimate: { 
            type: Number,
            min: [0, 'Remaining estimate cannot be negative'],
            max: [10000, 'Remaining estimate cannot exceed 10000 hours']
        },
        timeSpent: { 
            type: Number,
            min: [0, 'Time spent cannot be negative'],
            max: [10000, 'Time spent cannot exceed 10000 hours']
        },
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
    { 
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Add index for faster querying
IssueSchema.index({ key: 1 });
IssueSchema.index({ project: 1 });
IssueSchema.index({ sprint: 1 });
IssueSchema.index({ type: 1 });
IssueSchema.index({ status: 1 });

// Pre-save middleware to ensure estimates are valid
IssueSchema.pre('save', function(next) {
    // Convert string numbers to actual numbers
    if (this.storyPoints) this.storyPoints = Number(this.storyPoints);
    if (this.originalEstimate) this.originalEstimate = Number(this.originalEstimate);
    if (this.remainingEstimate) this.remainingEstimate = Number(this.remainingEstimate);
    if (this.timeSpent) this.timeSpent = Number(this.timeSpent);

    next();
});

module.exports = mongoose.model('Issue', IssueSchema);
