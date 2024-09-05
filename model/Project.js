const mongoose = require('mongoose');
const Schema = mongoose.Schema;
function stripTime(date) {
    if (!(date instanceof Date)) {
        date = new Date(date); // Convert string to Date
    }
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
ProjectSchema = new Schema(
    {
        ProjectName:{type:String,require:true},
        description: { type: String },
        StartDate:{type:Date,require:true, set: stripTime},
        EndDate:{type:Date,require:true, set :stripTime},
        issues: [{ type: Schema.Types.ObjectId, ref: 'Issue' }]

    },{ timestamps: true }
);
module.exports=mongoose.model('Project',ProjectSchema);