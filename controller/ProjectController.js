const ProjectService = require('../service/ProjectService');
const notificationService = require('../service/NotificationService');
module.exports = {
    async findAll(req, res, next) {
        try {
            const projects = await ProjectService.findAll();
            res.status(200).json(projects);
        } catch (error) {
            next(error);
        }
    },

    async findById(req, res, next) {
        try {
            const project = await ProjectService.findById(req.params.id);
            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }
            res.status(200).json(project);
        } catch (error) {
            next(error);
        }
    },

    async create(req, res, next) {
        try {
            const project = await ProjectService.create(req.body);

            // Create a notification for the project lead
            await notificationService.createAndSendNotification({
                recipient: project.projectLead, // Assuming projectLead is a valid user ID
                message: `You have been assigned as the lead for the project: ${project.projectName}`,
            });

            res.status(201).json(project);
        } catch (error) {
            console.error('Error creating project:', error.message);
            next(error);
        }
    },

    async update(req, res, next) {
        try {
            const project = await ProjectService.update(req.params.id, req.body);
            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }
            res.status(200).json(project);
        } catch (error) {
            next(error);
        }
    },

    async delete(req, res, next) {
        try {
            const result = await ProjectService.delete(req.params.id);
            if (!result) {
                return res.status(404).json({ message: 'Project not found' });
            }
            res.status(200).json({ message: 'Project deleted successfully', result });
        } catch (error) {
            console.error('Error deleting project:', error.message);
            next(error);
        }
    },
};
