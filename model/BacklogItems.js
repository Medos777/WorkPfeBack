const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const backlogItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: ['story', 'task', 'bug'], required: true },
    status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
    effortEstimate: { type: Number, default: 0 },
    sprint: { type: mongoose.Schema.Types.ObjectId, ref: 'Sprint', required: false },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: false },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('BacklogItem', backlogItemSchema);
