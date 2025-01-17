const templateService = require('../service/TemplateService');

class TemplateController {
    async getAllTemplates(req, res) {
        try {
            console.log('Getting all templates...');
            const templates = await templateService.getAllTemplates();
            console.log('Templates retrieved:', templates);
            res.json(templates);
        } catch (error) {
            console.error('Error in getAllTemplates:', error);
            res.status(500).json({ 
                message: error.message,
                stack: error.stack,
                name: error.name 
            });
        }
    }

    async getTemplateById(req, res) {
        try {
            const template = await templateService.getTemplateById(req.params.id);
            res.json(template);
        } catch (error) {
            if (error.message === 'Template not found') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: error.message });
            }
        }
    }

    async getTemplatesByType(req, res) {
        try {
            const templates = await templateService.getTemplatesByType(req.params.type);
            res.json(templates);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getDefaultTemplates(req, res) {
        try {
            const templates = await templateService.getDefaultTemplates();
            res.json(templates);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createTemplate(req, res) {
        try {
            templateService.validateTemplateData(req.body);
            // Use a default user ID if req.user is not available
            const userId = req.user ? req.user._id : null;
            const template = await templateService.createTemplate(req.body, userId);
            res.status(201).json(template);
        } catch (error) {
            if (error.name === 'ValidationError') {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: error.message });
            }
        }
    }

    async updateTemplate(req, res) {
        try {
            templateService.validateTemplateData(req.body);
            const template = await templateService.updateTemplate(req.params.id, req.body);
            res.json(template);
        } catch (error) {
            if (error.message === 'Template not found') {
                res.status(404).json({ message: error.message });
            } else if (error.name === 'ValidationError') {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: error.message });
            }
        }
    }

    async deleteTemplate(req, res) {
        try {
            await templateService.deleteTemplate(req.params.id);
            res.status(204).send();
        } catch (error) {
            if (error.message === 'Template not found') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: error.message });
            }
        }
    }

    async cloneTemplate(req, res) {
        try {
            const template = await templateService.cloneTemplate(req.params.id, req.user._id);
            res.status(201).json(template);
        } catch (error) {
            if (error.message === 'Template not found') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: error.message });
            }
        }
    }
}

module.exports = new TemplateController();