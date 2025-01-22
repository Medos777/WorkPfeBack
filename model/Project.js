const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stripTime = (date) => {
    return date instanceof Date
        ? new Date(date.getFullYear(), date.getMonth(), date.getDate())
        : new Date(new Date(date).setHours(0, 0, 0, 0));
};

const ProjectSchema = new Schema({
    projectType: {
        type: String,
        required: true,
        enum: ['Scrum', 'Kanban', 'simple'],
        default: 'scrum'
    },
    projectName: {
        type: String,
        required: true,
        trim: true,
        unique: true 
    },
    projectKey: {
        type: String,
        required: true,
        unique: true 
    },
    projectDescription: {
        type: String,
        trim: true
    },
    startDate: {
        type: Date,
        required: true,
        set: stripTime
    },
    endDate: {
        type: Date,
        required: true,
        set: stripTime
    },
    projectLead: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    teams: [{ type: Schema.Types.ObjectId, ref: 'Team', require: false }],
    issues: [{ type: Schema.Types.ObjectId, ref: 'Issue' }],
    budget: {
        type: Number,
        default: 0,
        validate: {
            validator: function(value) {
                return value >= 0;
            },
            message: 'Budget must be a positive number'
        }
    },
    costEstimate: {
        type: Number,
        default: 0,
        validate: {
            validator: function(value) {
                return value >= 0;
            },
            message: 'Cost estimate must be a positive number'
        }
    },
    status: {
        type: String,
        enum: ['Planned', 'In Progress', 'Completed', 'On Hold'],
        default: 'Planned'
    },
    progress: { type: Number, default: 0 },


    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

ProjectSchema.virtual('sprints', {
    ref: 'Sprint',
    localField: '_id',
    foreignField: 'project'
});

ProjectSchema.virtual('boards', {
    ref: 'Board',
    localField: '_id',
    foreignField: 'project'
});
ProjectSchema.pre('save', function (next) {
    if (!this.projectKey) {
        const projectName = this.projectName;
        const projectType = this.projectType;
        const projectKey = `${projectType.substring(0, 2)}-${projectName
            .toLowerCase()
            .replace(/ /g, '-')
            .substring(0, 10)}`;
        this.projectKey = projectKey;
    }
    next();
});

ProjectSchema.pre('save', async function (next) {
    if (this.endDate < this.startDate) {
        return next(new Error('End date must be after start date'));
    }

    if (this.costEstimate > this.budget) {
        return next(new Error('Cost estimate cannot exceed the budget'));
    }

    next();
});

module.exports = mongoose.model('Project', ProjectSchema);
