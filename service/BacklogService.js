const backlogRepository = require('../repository/backlogRepository');

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
}

module.exports = new BacklogService();
