const mongoose = require("mongoose");
const { Schema } = mongoose;

const BacklogItemSchema = require('./backlogItems').schema;
const BacklogSchema = new Schema({
    name: { type: String, required: true },
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    items: [{ type: Schema.Types.ObjectId, ref: 'BacklogItem' }],
    createdAt: { type: Date, default: Date.now }
});
module.exports=mongoose.model('Backlog',BacklogSchema);
const mongoose = require("mongoose");
const { Schema } = mongoose;
const Status = {
    TODO: 'TO_DO',
    IN_PROGRESS: 'IN_PROGRESS',
    DONE: 'DONE'
};

const ItemType = {
    TASK: 'TASK',
    STORY: 'STORY',
    BUG: 'BUG'
};

const BacklogItemSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    type: { type: String, enum: Object.values(ItemType), default: 'TASK' },
    status: { type: String, enum: Object.values(Status), default: 'TO_DO' },
    priority: { type: Number, default: 0 },
    assignee: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});
module.exports=mongoose.model('BacklogItems',BacklogItemSchema);
const mongoose = require('mongoose');
const Schema= mongoose.Schema;
function stripTime(date) {
    if (!(date instanceof Date)) {
        date = new Date(date); // Convert string to Date
    }
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
IssueShema=new Schema(
    {
        Title:{type:String,require:true},
        Description:{type:String,require:true},
        Status:{type:String,require:true},
        Priority:{type:String,require:true},
        CreateDate:{type:Date,require:true,set:stripTime},
        UpdateDate:{type:Date,require:true,set:stripTime},
        project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
        sprint: { type: Schema.Types.ObjectId, ref: 'Sprint' }


    },{ timestamps: true }
);
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
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
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

const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const SprintSchema = new Schema({
    name: { type: String, required: true },
    startDate: Date,
    endDate: Date,
    status: {
        type: String,
        enum: ['PLANNING', 'ACTIVE', 'COMPLETED'],
        default: 'PLANNING'
    },
    project: { type: Schema.Types.ObjectId, ref: 'Project' }
});
module.exports=mongoose.model('Sprint',SprintSchema);
// models/Team.js
// models/Team.js
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true,
        unique: true,
    },
    teamLead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
        },
    ],
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
        },
    ],
    teamCapacity: { type: Number },
    teamPerformance: { type: String },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Team', teamSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

USersSchema = new Schema(
    {
        username: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        adresse: {type: String, required: true},
        tel: {type: String, required: true},
        role: {type: String,
            enum: ['admin', 'manager', 'developer'],
            required: false, default: "admin"},
        lastLogin: { type: Date },
    },{ timestamps: true });
USersSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

module.exports = mongoose.model('Users',USersSchema);
const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
    boardName: {
        type: String,
        required: true,
        trim: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Board', BoardSchema);
