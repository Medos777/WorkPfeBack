const mongoose = require("mongoose");
const { Schema } = mongoose;
const BacklogItemSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    type: { type: String, enum: Object.values(ItemType), default: 'TASK' },
    status: { type: String, enum: Object.values(Status), default: 'TO_DO' },
    priority: { type: Number, default: 0 },
    assignee: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});
module.exports=mongoose.model('Issue',BacklogItemSchema);
