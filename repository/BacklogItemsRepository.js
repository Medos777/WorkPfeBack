const BacklogItem = require('../model/backlogItems');

class BacklogItemRepository {
    async createBacklogItem(data) {
        const backlogItem = new BacklogItem(data);
        return await backlogItem.save();
    }

    async getBacklogItemById(id) {
        return await BacklogItem.findById(id).populate('assignee');
    }

    async updateBacklogItem(id, data) {
        return await BacklogItem.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteBacklogItem(id) {
        return await BacklogItem.findByIdAndDelete(id);
    }

    async getAllBacklogItems() {
        return await BacklogItem.find();
    }
}

module.exports = new BacklogItemRepository();
