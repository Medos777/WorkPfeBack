const usersService = require('../service/UsersService');

module.exports = {
    async findAll(req, res, next) {
        try {
            const users = await usersService.findAll();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    },

    async findById(req, res, next) {
        try {
            const user = await usersService.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },

    async findByRole(req, res, next) {
        try {
            const usersRole = await usersService.findByRole(req.params.role);
            if (!usersRole || usersRole.length === 0) {
                return res.status(404).json({ message: 'No users found with the specified role' });
            }
            res.status(200).json(usersRole);
        } catch (error) {
            console.error('Error finding users by role:', error.message);
            next(error);
        }
    },

    async create(req, res, next) {
        try {
            const user = await usersService.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            console.error('Error creating user:', error.message);
            next(error);
        }
    },

    async update(req, res, next) {
        try {
            const user = await usersService.update(req.params.id, req.body);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },

    async delete(req, res, next) {
        try {
            const result = await usersService.delete(req.params.id);
            if (!result) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully', result });
        } catch (error) {
            console.error('Error deleting user:', error.message);
            next(error);
        }
    }
};
