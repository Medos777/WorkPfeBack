const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const templateSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ['scrum', 'kanban', 'project-management'],
        default: 'scrum'
    },
    icon: {
        type: String,
        required: true,
        enum: ['speed', 'kanban', 'project'],
        default: 'speed'
    },
    features: [{
        type: String,
        required: false
    }],
    defaultColumns: [{
        name: {
            type: String,
            required: true,
            trim: true
        },
        order: {
            type: Number,
            required: true
        },
        wipLimit: {
            type: Number,
            default: 0
        }
    }],
    settings: {
        sprintDuration: {
            type: Number,
            min: 1,
            max: 4,
            default: 2
        },
        estimationType: {
            type: String,
            enum: ['story-points', 'hours', 'days'],
            default: 'story-points'
        },
        columnLimit: {
            type: Number,
            min: 3,
            max: 10,
            default: 5
        },
        githubIntegration: {
            type: Boolean,
            default: false
        }
    },
    defaultIssueTypes: [{
        name: {
            type: String,
            required: true,
            trim: true
        },
        icon: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        }
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: false
    },
    isDefault: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

templateSchema.index({ type: 1 });
templateSchema.index({ isDefault: 1 });
templateSchema.index({ createdBy: 1 });

const Template = mongoose.model('Template', templateSchema);
module.exports = Template;