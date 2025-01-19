const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transitionSchema = new Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    conditions: [{
        type: { type: String, enum: ['role', 'status', 'custom'] },
        value: Schema.Types.Mixed
    }]
});

const columnSchema = new Schema({
    name: { type: String, required: true },
    order: { type: Number, required: true },
    wipLimit: { type: Number, default: 0 },
    statuses: [{ type: String }],
    subColumns: [{
        name: { type: String },
        statuses: [{ type: String }]
    }]
});

const quickFilterSchema = new Schema({
    name: { type: String, required: true },
    query: { type: Object, required: true },
    icon: { type: String },
    color: { type: String }
});

const boardSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['scrum', 'kanban'], required: true },
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    columns: [columnSchema],
    issues: [{ type: Schema.Types.ObjectId, ref: 'Issue' }],
    quickFilters: [quickFilterSchema],
    savedFilters: [{
        name: { type: String },
        query: { type: Object },
        isShared: { type: Boolean, default: false },
        owner: { type: Schema.Types.ObjectId, ref: 'User' }
    }],
    sprints: [{ type: Schema.Types.ObjectId, ref: 'Sprint' }],
    admins: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    workflow: {
        statuses: [{
            name: { type: String, required: true },
            category: { type: String, enum: ['todo', 'inprogress', 'done'] },
            color: String
        }],
        transitions: [transitionSchema]
    },
    settings: {
        estimation: { type: String, enum: ['story points', 'time'], default: 'story points' },
        workingDays: { type: [String], default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
        backlogIsVisible: { type: Boolean, default: true },
        cardLayout: {
            fields: [{ type: String }], // Which fields to show on cards
            showAssignee: { type: Boolean, default: true },
            showPriority: { type: Boolean, default: true },
            showEstimate: { type: Boolean, default: true }
        },
        defaultView: { type: String, enum: ['board', 'backlog'], default: 'board' },
        swimlanes: { type: String, enum: ['none', 'epics', 'assignees', 'custom'], default: 'none' }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Add indexes for better performance
boardSchema.index({ project: 1 });
boardSchema.index({ 'columns.name': 1 });

module.exports = mongoose.model('Board', boardSchema);
