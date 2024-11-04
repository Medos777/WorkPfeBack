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
