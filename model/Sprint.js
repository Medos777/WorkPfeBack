const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const sprintSchema = new mongoose.Schema({
    sprintName: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    goal: { type: String, trim: true },
    capacity: { type: Number, default: 0 },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    backlogItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BacklogItem' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Sprint', sprintSchema);
