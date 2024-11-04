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

    async findByProject(req, res, next) {
        try {
            const SprintProject = await sprintService.findByProject(req.params.project);
            if (!SprintProject || SprintProject.length === 0) {
                return res.status(404).json({ message: 'No sprint found with the specified project' });
            }
            res.status(200).json(SprintProject);
        } catch (error) {
            console.error('Error finding sprint by project:', error.message);
            next(error);
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
