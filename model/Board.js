const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const boardSchema = new mongoose.Schema({
    boardName: { type: String, required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    boardType: { type: String, enum: ['kanban', 'scrum'], default: 'kanban' },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Board', boardSchema);
