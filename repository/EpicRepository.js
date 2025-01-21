const Epic = require('../model/Epic');

class EpicRepository {
    async create(data) {
        const epic = new Epic(data);
        return await epic.save();
    }

    async findAll(filters = {}) {
        return await Epic.find(filters);
    }

    async findById(id) {
        return await Epic.findById(id);
    }
async findByProjectId(projectId) {
    return await Epic.find({ project: projectId });
}
    async update(id, data) {
        return await Epic.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }

    async delete(id) {
        return await Epic.findByIdAndDelete(id);
    }
}

module.exports = new EpicRepository();