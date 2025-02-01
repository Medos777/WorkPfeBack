const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EpicSchema = new Schema(
    {
        key: { type: String, unique: true }, // Optional now, only required for project-linked epics
        name: { type: String, required: true }, // Epic name/summary
        description: { type: String },
        status: { 
            type: String, 
            enum: ['to do', 'in progress', 'done'],
            default: 'to do',
            required: true 
        },
        color: { type: String }, // Epic color for visualization
        project: { type: Schema.Types.ObjectId, ref: 'Project', required: false },
        owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        startDate: { type: Date },
        dueDate: { type: Date },
        issues: [{ type: Schema.Types.ObjectId, ref: 'Issue' }],
        progress: {
            total: { type: Number, default: 0 }, // Total number of issues
            completed: { type: Number, default: 0 } // Completed issues
        },
        priority: { 
            type: String, 
            enum: ['highest', 'high', 'medium', 'low', 'lowest'],
            default: 'medium'
        },
        labels: [{ type: String }],
        watchers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    { 
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);


// Method to calculate progress
EpicSchema.methods.updateProgress = async function() {
    const issues = await mongoose.model('Issue').find({ epic: this._id });
    this.progress.total = issues.length;
    this.progress.completed = issues.filter(issue => issue.status === 'done').length;
    await this.save();
};

module.exports = mongoose.model('Epic', EpicSchema);