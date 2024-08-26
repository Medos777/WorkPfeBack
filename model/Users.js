const mongoose = require('mongoose');
const Schema = mongoose.Schema;
USersSchema = new Schema(
    {
        username: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        adresse: {type: String, required: true},
        tel: {type: String, required: true},
        role: {type: String, required: false, default: "admin"}
    });
module.exports = mongoose.model('Users',USersSchema);