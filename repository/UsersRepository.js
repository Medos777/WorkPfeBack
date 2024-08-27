const Users = require('../model/Users');

module.exports = {
    async findAll() {
        try {
            return await Users.find();
        } catch (err) {
            throw new Error(`Unable to retrieve users: ${err.message}`);
        }
    },
    async findById(id) {
        try {
            return await Users.findById(id);
        } catch (err) {
            throw new Error(`Unable to find user by ID: ${err.message}`);
        }
    },
    async findByRole(role) {
        try {
            return await Users.find({ role: role });
        } catch (err) {
            throw new Error(`Unable to find users by role: ${err.message}`);
        }
    },
    async update(id, data) {
        try {
            return await Users.findByIdAndUpdate(id, data, { new: true });
        } catch (err) {
            throw new Error(`Unable to update user: ${err.message}`);
        }
    },
    async delete(id) {
        try {
            return await Users.findByIdAndDelete(id);
        } catch (err) {
            throw new Error(`Unable to delete user: ${err.message}`);
        }
    },
    async create(data) {
        try {
            const user = new Users(data);
            return await user.save();
        } catch (err) {
            throw new Error(`Unable to create user: ${err.message}`);
        }
    }
}
