const backlogRepository = require('../repository/BacklogRepository');

class BacklogService {
    async createBacklog(data) {
        return await backlogRepository.createBacklog(data);
    }

    async getBacklogById(id) {
        const backlog = await backlogRepository.getBacklogById(id);
        if (!backlog) {
            throw new Error('ListBacklog not found');
        }
        return backlog;
    }
    async getBacklogsByProjectId(projectId) {
        try {
            return await backlogRepository.getBacklogsByProjectId(projectId);
        } catch (error) {
            console.error('Error in getBacklogsByProjectId:', error);
            throw error;
        }   
    }
    async getBacklogsByUser(userId) {
        try {
            return await backlogRepository.getBacklogsByUser(userId);
        } catch (error) {
            console.error('Error in getBacklogsByUser:', error);
            throw error;
        }
    }

    async updateBacklog(id, data) {
        const updatedBacklog = await backlogRepository.updateBacklog(id, data);
        if (!updatedBacklog) {
            throw new Error('ListBacklog not found or could not be updated');
        }
        return updatedBacklog;
    }

    async deleteBacklog(id) {
        const deletedBacklog = await backlogRepository.deleteBacklog(id);
        if (!deletedBacklog) {
            throw new Error('ListBacklog not found or could not be deleted');
        }
        return deletedBacklog;
    }

    async getAllBacklogs() {
        return await backlogRepository.getAllBacklogs();
    }

    async getBacklogsByProjectId(projectId) {
        return await backlogRepository.getBacklogsByProjectId(projectId);
    }
}

module.exports = new BacklogService();
