const Template = require('../model/Template');
const defaultTemplates = require('../data/defaultTemplates');

class TemplateRepository {
    async findAll() {
        try {
            console.log('TemplateRepository: Finding all templates...');
            const templates = await Template.find()
                .populate({
                    path: 'createdBy',
                    select: 'username',
                    match: { _id: { $exists: true } }
                })
                .lean()  // Convert to plain JavaScript objects
                .exec(); // Explicitly execute the query
            
            console.log('TemplateRepository: Found templates:', templates);
            return templates;
        } catch (error) {
            console.error('TemplateRepository Error:', error);
            throw new Error(`Failed to fetch templates: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            if (!id || id === 'undefined') {
                throw new Error('Invalid template ID provided');
            }
            console.log('TemplateRepository: Finding template by ID:', id);
            const template = await Template.findById(id)
                .populate({
                    path: 'createdBy',
                    select: 'username'
                })
                .lean()
                .exec();
            console.log('TemplateRepository: Found template:', template);
            return template;
        } catch (error) {
            console.error('TemplateRepository Error:', error);
            throw error;
        }
    }

    async findByType(type) {
        return Template.find({ type }).sort('-createdAt');
    }

    async findDefaultTemplates() {
        return Template.find({ isDefault: true }).sort('type');
    }

    async create(templateData) {
        const template = new Template(templateData);
        return template.save();
    }

    async update(id, templateData) {
        try {
            const updatedTemplate = await Template.findByIdAndUpdate(
                id,
                templateData,
                { new: true, runValidators: true }
            );
            if (!updatedTemplate) {
                throw new Error('Template not found');
            }
            return updatedTemplate;
        } catch (error) {
            console.error('Error in template update:', error);
            throw error;
        }
    }

    async delete(id) {
        return Template.findByIdAndDelete(id);
    }

    async cloneTemplate(id, userId) {
        const template = await Template.findById(id);
        if (!template) return null;

        const cloneData = template.toObject();
        delete cloneData._id;
        delete cloneData.createdAt;
        delete cloneData.updatedAt;
        cloneData.isDefault = false;
        cloneData.createdBy = userId;
        cloneData.name = `${cloneData.name} (Copy)`;

        return this.create(cloneData);
    }

    async initializeDefaultTemplates(userId) {
        try {
            const count = await Template.countDocuments({ isDefault: true });
            if (count === 0) {
                const templatesWithUser = defaultTemplates.map(template => ({
                    ...template,
                    createdBy: userId // Add the admin user as creator
                }));
                await Template.insertMany(templatesWithUser);
                console.log('Default templates created successfully');
            }
        } catch (error) {
            console.error('Error initializing default templates:', error);
            throw error;
        }
    }
}

module.exports = new TemplateRepository();