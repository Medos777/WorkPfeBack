const mongoose = require("mongoose");
const { Schema } = mongoose;

const BacklogItemSchema = require('./backlogItems').schema;
const BacklogSchema = new Schema({
    name: { type: String, required: true },
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    items: [{ type: Schema.Types.ObjectId, ref: 'BacklogItem' ,require:false}],
    createdAt: { type: Date, default: Date.now }
});
module.exports=mongoose.model('Backlog',BacklogSchema);
