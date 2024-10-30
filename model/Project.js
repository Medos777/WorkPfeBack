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
        trim: true
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
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

ProjectSchema.virtual('epics', {
    ref: 'Epic',
    localField: '_id',
    foreignField: 'project'
});

ProjectSchema.virtual('sprints', {
    ref: 'Sprint',
    localField: '_id',
    foreignField: 'project'
});

// Virtual for associated boards
ProjectSchema.virtual('boards', {
    ref: 'Board',
    localField: '_id',
    foreignField: 'project'
});

ProjectSchema.pre('save', async function(next) {
    if (this.endDate < this.startDate) {
        return next(new Error('End date must be after start date'));
    }



    next();
});

module.exports = mongoose.model('Project', ProjectSchema);