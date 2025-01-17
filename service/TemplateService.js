const templateRepository = require('../repository/TemplateRepository');

class TemplateService {
    async getAllTemplates() {
        try {
            console.log('TemplateService: Getting all templates...');
            const templates = await templateRepository.findAll();
            console.log('TemplateService: Templates found:', templates);
            return templates;
        } catch (error) {
            console.error('TemplateService Error:', error);
            throw error;
        }
    }

    async getTemplateById(id) {
        const template = await templateRepository.findById(id);
        if (!template) {
            throw new Error('Template not found');
        }
        return template;
    }

    async getTemplatesByType(type) {
        return templateRepository.findByType(type);
    }

    async getDefaultTemplates() {
        return templateRepository.findDefaultTemplates();
    }

    async createTemplate(templateData, userId) {
        if (userId) {
            templateData.createdBy = userId;
        }
        return templateRepository.create(templateData);
    }

    async updateTemplate(id, templateData) {
        try {
            console.log('Updating template with ID:', id);
            console.log('Template data:', templateData);
            
            const template = await templateRepository.update(id, templateData);
            console.log('Template updated successfully:', template);
            return template;
        } catch (error) {
            console.error('Error updating template:', error);
            throw error;
        }
    }

    async deleteTemplate(id) {
        const template = await templateRepository.delete(id);
        if (!template) {
            throw new Error('Template not found');
        }
        return template;
    }

    async cloneTemplate(id, userId) {
        const clonedTemplate = await templateRepository.cloneTemplate(id, userId);
        if (!clonedTemplate) {
            throw new Error('Template not found');
        }
        return clonedTemplate;
    }

    async initializeDefaultTemplates(userId) {
        if (!userId) {
            throw new Error('User ID is required to initialize default templates');
        }
        return templateRepository.initializeDefaultTemplates(userId);
    }

    validateTemplateData(templateData) {
        const requiredFields = ['name', 'description', 'type', 'icon'];
        for (const field of requiredFields) {
            if (!templateData[field]) {
                throw new Error(`${field} is required`);
            }
        }

        if (!['scrum', 'kanban', 'project-management'].includes(templateData.type)) {
            throw new Error('Invalid template type');
        }

        if (!['speed', 'kanban', 'project'].includes(templateData.icon)) {
            throw new Error('Invalid icon type');
        }

        if (templateData.defaultColumns) {
            this.validateColumns(templateData.defaultColumns);
        }

        if (templateData.defaultIssueTypes) {
            this.validateIssueTypes(templateData.defaultIssueTypes);
        }
    }

    validateColumns(columns) {
        if (!Array.isArray(columns)) {
            throw new Error('Columns must be an array');
        }

        columns.forEach((column, index) => {
            if (!column.name) {
                throw new Error(`Column at position ${index} must have a name`);
            }
            if (typeof column.order !== 'number') {
                throw new Error(`Column at position ${index} must have a valid order number`);
            }
        });
    }

    validateIssueTypes(issueTypes) {
        if (!Array.isArray(issueTypes)) {
            throw new Error('Issue types must be an array');
        }

        issueTypes.forEach((type, index) => {
            if (!type.name || !type.icon || !type.color) {
                throw new Error(`Issue type at position ${index} must have name, icon, and color`);
            }
        });
    }
}

module.exports = new TemplateService();