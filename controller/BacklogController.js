const backlogService = require('../service/BacklogService');

class BacklogController {
    async createBacklog(req, res) {
        try {
            const newBacklog = await backlogService.createBacklog(req.body);
            res.status(201).json(newBacklog);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getBacklogById(req, res) {
        try {
            const backlog = await backlogService.getBacklogById(req.params.id);
            res.status(200).json(backlog);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async updateBacklog(req, res) {
        try {
            const updatedBacklog = await backlogService.updateBacklog(req.params.id, req.body);
            res.status(200).json(updatedBacklog);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteBacklog(req, res) {
        try {
            await backlogService.deleteBacklog(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
    async getBacklogsByProjectId(req, res) {
        try {
            const backlogs = await backlogService.getBacklogsByProjectId(req.params.projectId);
            res.json(backlogs);
        } catch (error) {
            console.error('Error getting backlogs by project:', error);
            res.status(500).json({ message: error.message || 'Failed to fetch backlogs for project' });
        }
    }   
    async getAllBacklogs(req, res) {
        try {
            const backlogs = await backlogService.getAllBacklogs();
            res.status(200).json(backlogs);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new BacklogController();
