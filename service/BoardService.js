const boardRepository = require('../repository/BoardRepository');

class BoardService {
    async getAllBoards() {
        return await boardRepository.findAll();
    }

    async getBoardById(id) {
        const board = await boardRepository.findById(id);
        if (!board) {
            throw new Error('Board not found');
        }
        return board;
    }

    async getBoardsByProject(projectId) {
        return await boardRepository.findByProject(projectId);
    }

    async createBoard(boardData) {
        // Ensure required fields are present
        if (!boardData.name || !boardData.type || !boardData.project) {
            throw new Error('Name, type, and project are required fields');
        }

        // Validate board type
        if (!['scrum', 'kanban'].includes(boardData.type)) {
            throw new Error('Board type must be either scrum or kanban');
        }

        // Initialize arrays if not provided
        boardData.columns = boardData.columns || [];
        boardData.issues = boardData.issues || [];
        boardData.quickFilters = boardData.quickFilters || [];
        boardData.savedFilters = boardData.savedFilters || [];
        boardData.sprints = boardData.sprints || [];
        boardData.admins = boardData.admins || [];
        boardData.members = boardData.members || [];

        return await boardRepository.create(boardData);
    }

    async updateBoard(id, boardData) {
        // Validate board type if provided
        if (boardData.type && !['scrum', 'kanban'].includes(boardData.type)) {
            throw new Error('Board type must be either scrum or kanban');
        }

        const board = await boardRepository.update(id, boardData);
        if (!board) {
            throw new Error('Board not found');
        }
        return board;
    }

    async deleteBoard(id) {
        const board = await boardRepository.delete(id);
        if (!board) {
            throw new Error('Board not found');
        }
        return board;
    }
}

module.exports = new BoardService();
