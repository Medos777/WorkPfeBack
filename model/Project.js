const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stripTime = (date) => {
    return date instanceof Date
        ? new Date(date.getFullYear(), date.getMonth(), date.getDate())
        : new Date(new Date(date).setHours(0, 0, 0, 0));
};

const ProjectSchema = new Schema({
    projectName: {
        type: String,
        required: true,
        trim: true,
        unique: true // Ensure unique project names
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
        required: true
    },
    teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
    budget: {
        type: Number,
        default: 0,
        validate: {
            validator: (value) => value >= 0,
            message: 'Budget must be a positive number'
        }
    },
    costEstimate: {
        type: Number,
        default: 0,
        validate: {
            validator: (value) => value >= 0,
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
