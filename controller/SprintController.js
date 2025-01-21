const sprintService = require('../service/SprintService');

module.exports = {
    async findAll(req, res, next) {
        try {
            const sprints = await sprintService.findAll();
            res.status(200).json(sprints);
        } catch (error) {
            next(error);
        }
    },

    async findById(req, res, next) {
        try {
            const sprint = await sprintService.findById(req.params.id);
            if (!sprint) {
                return res.status(404).json({ message: 'sprint not found' });
            }
            res.status(200).json(sprint);
        } catch (error) {
            next(error);
        }
    },

    async findByProjectId(req, res, next) {
        try {
            console.log('Finding sprints for project ID:', req.params.id);
            const sprints = await sprintService.findByProjectId(req.params.id);
            console.log('Found sprints:', sprints);
            res.json(sprints);
        } catch (error) {
            console.error('Error getting sprints by project:', error);
            res.status(500).json({ message: error.message || 'Failed to fetch sprints for project' });
        }
    },

    async create(req, res, next) {
        try {
            const sprint = await sprintService.create(req.body);
            res.status(201).json(sprint);
        } catch (error) {
            console.error('Error creating sprint:', error.message);
            next(error);
        }
    },

    async update(req, res, next) {
        try {
            const sprint = await sprintService.update(req.params.id, req.body);
            if (!sprint) {
                return res.status(404).json({ message: 'sprint not found' });
            }
            res.status(200).json(sprint);
        } catch (error) {
            next(error);
        }
    },

    async delete(req, res, next) {
        try {
            const result = await sprintService.delete(req.params.id);
            if (!result) {
                return res.status(404).json({ message: 'sprint not found' });
            }
            res.status(200).json({ message: 'sprint deleted successfully', result });
        } catch (error) {
            console.error('Error deleting user:', error.message);
            next(error);
        }
    }
};
