const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const teamSchema = new mongoose.Schema({
    teamName: { type: String, required: true, unique: true },
    teamLead: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    teamCapacity: { type: Number, default: 0 },
    performanceMetrics: {
        efficiency: { type: Number, default: 0 },
        velocity: { type: Number, default: 0 },
    },
    teamGoal: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);
