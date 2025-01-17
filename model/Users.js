const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

USersSchema = new Schema(
    {
        username: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        adresse: {type: String, required: true},
        tel: {type: String, required: true},
        role: {type: String,
                enum: ['admin', 'manager', 'developer'],
                required: false, default: "admin"},
            profileImage: { type: String },
            bio: { type: String, maxlength: 500 },
            lastLogin: { type: Date },
    },{ timestamps: true });
USersSchema.pre('save', async function(next) {
        const user = this;
        if (user.isModified('password')) {
                user.password = await bcrypt.hash(user.password, 10);
        }
        next();
});

module.exports = mongoose.model('Users',USersSchema);