const mongoose = require("mongoose");
const BacklogSchema = new Schema({
    name: { type: String, required: true },
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    items: [BacklogItemSchema],
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Backlog', BacklogIteamsSchema);