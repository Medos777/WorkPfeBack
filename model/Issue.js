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
        project: { type: Schema.Types.ObjectId, ref: 'Project', required: true }

    },{ timestamps: true }
);
module.exports=mongoose.model('Issue',IssueShema);
