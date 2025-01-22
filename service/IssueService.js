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
        try {
            console.log('Validating issue data:', data);
            // Validate required fields
            this.validateIssueData(data);

            // Clean up data
            const issueData = {
                ...data,
                // Convert string IDs to ObjectIds if needed
                project: data.project,
                reporter: data.reporter,
                assignee: data.assignee || undefined,
                sprint: data.sprint || undefined,
                epic: data.epic || undefined,
                // Convert numeric fields
                storyPoints: data.storyPoints ? Number(data.storyPoints) : undefined,
                originalEstimate: data.originalEstimate ? Number(data.originalEstimate) : undefined,
                remainingEstimate: data.remainingEstimate ? Number(data.remainingEstimate) : undefined,
                timeSpent: data.timeSpent ? Number(data.timeSpent) : undefined,
                // Initialize arrays if not provided
                labels: data.labels || [],
                components: data.components || [],
                watchers: data.watchers || [],
                comments: data.comments || []
            };

            console.log('Creating issue with cleaned data:', issueData);
            return await issueRepository.create(issueData);
        } catch (error) {
            console.error('Error in issue service create:', error);
            throw error;
        }
    }

    async update(id, data) {
        try {
            // Validate update data
            if (Object.keys(data).length === 0) {
                throw new Error('Update data cannot be empty');
            }
            return await issueRepository.update(id, data);
        } catch (error) {
            console.error('Error in issue service update:', error);
            throw error;
        }
    }

    async delete(id) {
        try {
            return await issueRepository.delete(id);
        } catch (error) {
            console.error('Error in issue service delete:', error);
            throw error;
        }
    }

    async addComment(issueId, comment) {
        try {
            if (!comment.content || !comment.author) {
                throw new Error('Comment must have content and author');
            }
            return await issueRepository.addComment(issueId, comment);
        } catch (error) {
            console.error('Error in issue service addComment:', error);
            throw error;
        }
    }

    async addAttachment(issueId, attachment) {
        try {
            if (!attachment.filename || !attachment.path || !attachment.uploadedBy) {
                throw new Error('Attachment must have filename, path and uploadedBy');
            }
            return await issueRepository.addAttachment(issueId, attachment);
        } catch (error) {
            console.error('Error in issue service addAttachment:', error);
            throw error;
        }
    }

    async updateTimeTracking(issueId, timeData) {
        try {
            if (!timeData.originalEstimate && !timeData.remainingEstimate && !timeData.timeSpent) {
                throw new Error('At least one time tracking field must be provided');
            }
            return await issueRepository.updateTimeTracking(issueId, timeData);
        } catch (error) {
            console.error('Error in issue service updateTimeTracking:', error);
            throw error;
        }
    }

    validateIssueData(data) {
        console.log('Validating issue data in service:', data);
        const requiredFields = ['title', 'description', 'type', 'status', 'priority', 'reporter', 'project'];
        const missingFields = requiredFields.filter(field => !data[field]);
        
        if (missingFields.length > 0) {
            throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }

        // Validate type
        const validTypes = ['story', 'task', 'bug', 'epic'];
        if (!validTypes.includes(data.type)) {
            throw new Error(`Invalid issue type. Must be one of: ${validTypes.join(', ')}`);
        }

        // Validate priority
        const validPriorities = ['highest', 'high', 'medium', 'low', 'lowest'];
        if (!validPriorities.includes(data.priority)) {
            throw new Error(`Invalid priority level. Must be one of: ${validPriorities.join(', ')}`);
        }

        // Validate status
        const validStatuses = ['todo', 'inprogress', 'done'];
        if (!validStatuses.includes(data.status)) {
            throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
        }

        // Validate numeric fields
        if (data.storyPoints && (isNaN(data.storyPoints) || data.storyPoints <= 0)) {
            throw new Error('Story points must be a positive number');
        }

        if (data.originalEstimate && (isNaN(data.originalEstimate) || data.originalEstimate <= 0)) {
            throw new Error('Original estimate must be a positive number');
        }

        if (data.remainingEstimate && (isNaN(data.remainingEstimate) || data.remainingEstimate <= 0)) {
            throw new Error('Remaining estimate must be a positive number');
        }

        if (data.timeSpent && (isNaN(data.timeSpent) || data.timeSpent <= 0)) {
            throw new Error('Time spent must be a positive number');
        }

        console.log('Issue data validation passed');
    }
}

module.exports = new IssueService();