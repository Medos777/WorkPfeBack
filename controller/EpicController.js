const EpicService = require('../service/EpicServices');

class EpicController {
    async createEpic(req, res) {
        try {
            const epicData = {
                ...req.body,
                startDate: req.body.startDate ? new Date(req.body.startDate) : undefined,
                dueDate: req.body.dueDate ? new Date(req.body.dueDate) : undefined
            };

            if (epicData.startDate && epicData.dueDate && epicData.startDate > epicData.dueDate) {
                return res.status(400).json({ message: 'Due date must be after start date' });
            }

            const epic = await EpicService.createEpic(epicData);
            res.status(201).json(epic);
        } catch (error) {
            console.error('Error creating epic:', error);
            res.status(400).json({ 
                message: error.message || 'Failed to create epic'
            });
        }
    }

    async getAllEpics(req, res) {
        try {
            const epics = await EpicService.getAllEpics(req.query);
            res.json(epics);
        } catch (error) {
            console.error('Error getting all epics:', error);
            res.status(500).json({ message: error.message || 'Failed to fetch epics' });
        }
    }

    async getEpicById(req, res) {
        try {
            const epic = await EpicService.getEpicById(req.params.id);
            if (!epic) {
                return res.status(404).json({ message: 'Epic not found' });
            }
            res.json(epic);
        } catch (error) {
            console.error('Error getting epic by id:', error);
            res.status(500).json({ message: error.message || 'Failed to fetch epic' });
        }
    }

    async getEpicsByProject(req, res) {
        try {
            const epics = await EpicService.getEpicsByProject(req.params.projectId);
            res.json(epics);
        } catch (error) {
            console.error('Error getting epics by project:', error);
            res.status(500).json({ message: error.message || 'Failed to fetch epics for project' });
        }
    }

    async updateEpic(req, res) {
        try {
            const epic = await EpicService.updateEpic(req.params.id, req.body);
            if (!epic) {
                return res.status(404).json({ message: 'Epic not found' });
            }
            res.json(epic);
        } catch (error) {
            console.error('Error updating epic:', error);
            if (error.message === 'Project not found') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(400).json({ message: error.message || 'Failed to update epic' });
            }
        }
    }

    async deleteEpic(req, res) {
        try {
            const epic = await EpicService.deleteEpic(req.params.id);
            if (!epic) {
                return res.status(404).json({ message: 'Epic not found' });
            }
            res.status(204).send();
        } catch (error) {
            console.error('Error deleting epic:', error);
            res.status(500).json({ message: error.message || 'Failed to delete epic' });
        }
    }

    async updateEpicProgress(req, res) {
        try {
            const epic = await EpicService.updateEpicProgress(req.params.id);
            if (!epic) {
                return res.status(404).json({ message: 'Epic not found' });
            }
            res.json(epic);
        } catch (error) {
            console.error('Error updating epic progress:', error);
            res.status(500).json({ message: error.message || 'Failed to update epic progress' });
        }
    }

    async addWatcher(req, res) {
        try {
            const epic = await EpicService.addWatcher(req.params.id, req.body.userId);
            res.json(epic);
        } catch (error) {
            console.error('Error adding watcher:', error);
            res.status(400).json({ message: error.message || 'Failed to add watcher' });
        }
    }

    async removeWatcher(req, res) {
        try {
            const epic = await EpicService.removeWatcher(req.params.id, req.body.userId);
            res.json(epic);
        } catch (error) {
            console.error('Error removing watcher:', error);
            res.status(400).json({ message: error.message || 'Failed to remove watcher' });
        }
    }

    async getEpicsByProjectId(req, res) {
        try {
            const epics = await EpicService.getEpicsByProjectId(req.params.projectId);
            res.json(epics);
        } catch (error) {
            console.error('Error getting epics by project:', error);
            res.status(500).json({ message: error.message || 'Failed to fetch epics for project' });
        }
    }   
}

module.exports = new EpicController();