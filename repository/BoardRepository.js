const Board = require('../model/Board');

class BoardRepository {
    async findAll() {
        return await Board.find()
            .populate('project')
            .populate('issues')
            .populate('sprints')
            .populate('admins')
            .populate('members');
    }

    async findById(id) {
        return await Board.findById(id)
            .populate('project')
            .populate('issues')
            .populate('sprints')
            .populate('admins')
            .populate('members');
    }

    async findByProject(projectId) {
        return await Board.find({ project: projectId })
            .populate('issues')
            .populate('sprints')
            .populate('admins')
            .populate('members');
    }

    async create(boardData) {
        const board = new Board(boardData);
        return await board.save();
    }

    async update(id, boardData) {
        return await Board.findByIdAndUpdate(id, boardData, { new: true, runValidators: true });
    }

    async delete(id) {
        return await Board.findByIdAndDelete(id);
    }
}

module.exports = new BoardRepository();
