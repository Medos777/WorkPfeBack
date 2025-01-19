const backlogItemRepository = require('../repository/BacklogItemsRepository');

class BacklogItemService {
    async createBacklogItem(data) {
        // Additional business logic, validation, etc., can go here
        return await backlogItemRepository.createBacklogItem(data);
    }

    async getBacklogItemById(id) {
        const backlogItem = await backlogItemRepository.getBacklogItemById(id);
        if (!backlogItem) {
            throw new Error('BacklogItem not found');
        }
        return backlogItem;
    }

    async updateBacklogItem(id, data) {
        const updatedBacklogItem = await backlogItemRepository.updateBacklogItem(id, data);
        if (!updatedBacklogItem) {
            throw new Error('BacklogItem not found or could not be updated');
        }
        return updatedBacklogItem;
    }

    async deleteBacklogItem(id) {
        const deletedBacklogItem = await backlogItemRepository.deleteBacklogItem(id);
        if (!deletedBacklogItem) {
            throw new Error('BacklogItem not found or could not be deleted');
        }
        return deletedBacklogItem;
    }

    async getAllBacklogItems() {
        return await backlogItemRepository.getAllBacklogItems();
    }
}

module.exports = new BacklogItemService();
