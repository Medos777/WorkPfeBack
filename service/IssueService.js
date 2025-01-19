const issueRepository = require('../repository/IssueRepository');

class IssueService {
    async findAll(options = {}) {
        return await issueRepository.findAll(options);
    }

    async findById(id, options = {}) {
        return await issueRepository.findById(id, options);
    }

    async findByProject(projectId, options = {}) {
        return await issueRepository.findByProject(projectId, options);
    }

    async findByEpic(epicId, options = {}) {
        return await issueRepository.findByEpic(epicId, options);
    }

    async findBySprint(sprintId, options = {}) {
        return await issueRepository.findBySprint(sprintId, options);
    }

    async create(data) {
        // Validate required fields
        this.validateIssueData(data);
        return await issueRepository.create(data);
    }

    async update(id, data) {
        // Validate update data
        if (Object.keys(data).length === 0) {
            throw new Error('Update data cannot be empty');
        }
        return await issueRepository.update(id, data);
    }

    async delete(id) {
        return await issueRepository.delete(id);
    }

    async addComment(issueId, comment) {
        if (!comment.content || !comment.author) {
            throw new Error('Comment must have content and author');
        }
        return await issueRepository.addComment(issueId, comment);
    }

    async addAttachment(issueId, attachment) {
        if (!attachment.filename || !attachment.path || !attachment.uploadedBy) {
            throw new Error('Attachment must have filename, path and uploadedBy');
        }
        return await issueRepository.addAttachment(issueId, attachment);
    }

    async updateTimeTracking(issueId, timeData) {
        if (!timeData.originalEstimate && !timeData.remainingEstimate && !timeData.timeSpent) {
            throw new Error('At least one time tracking field must be provided');
        }
        return await issueRepository.updateTimeTracking(issueId, timeData);
    }

    validateIssueData(data) {
        const requiredFields = ['title', 'description', 'type', 'status', 'priority', 'reporter', 'project'];
        const missingFields = requiredFields.filter(field => !data[field]);
        
        if (missingFields.length > 0) {
            throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }

        if (data.type && !['story', 'task', 'bug', 'epic'].includes(data.type)) {
            throw new Error('Invalid issue type');
        }

        if (data.priority && !['highest', 'high', 'medium', 'low', 'lowest'].includes(data.priority)) {
            throw new Error('Invalid priority level');
        }
    }
}

module.exports = new IssueService();