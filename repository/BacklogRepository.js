const Backlog = require('../model/Backlog');

class BacklogRepository {
    async createBacklog(data) {
        const backlog = new Backlog(data);
        return await backlog.save();
    }

    async getBacklogById(id) {
        return await Backlog.findById(id).populate('project').populate('items.assignee');
    }

    async updateBacklog(id, data) {
        return await Backlog.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteBacklog(id) {
        return await Backlog.findByIdAndDelete(id);
    }

    async getAllBacklogs() {
        return await Backlog.find().populate('project');
    }
}

module.exports = new BacklogRepository();
