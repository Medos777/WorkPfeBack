const boardService = require('../service/BoardService');

class BoardController {
    async getAllBoards(req, res) {
        try {
            const boards = await boardService.getAllBoards();
            res.status(200).json(boards);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getBoardById(req, res) {
        try {
            const board = await boardService.getBoardById(req.params.id);
            res.status(200).json(board);
        } catch (error) {
            if (error.message === 'Board not found') {
                return res.status(404).json({ message: error.message });
            }
            res.status(500).json({ message: error.message });
        }
    }

    async getBoardsByProject(req, res) {
        try {
            const boards = await boardService.getBoardsByProject(req.params.projectId);
            res.status(200).json(boards);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createBoard(req, res) {
        try {
            const board = await boardService.createBoard(req.body);
            res.status(201).json(board);
        } catch (error) {
            if (error.message.includes('required fields') || error.message.includes('board type')) {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: error.message });
        }
    }

    async updateBoard(req, res) {
        try {
            const board = await boardService.updateBoard(req.params.id, req.body);
            res.status(200).json(board);
        } catch (error) {
            if (error.message === 'Board not found') {
                return res.status(404).json({ message: error.message });
            }
            if (error.message.includes('board type')) {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: error.message });
        }
    }

    async deleteBoard(req, res) {
        try {
            const board = await boardService.deleteBoard(req.params.id);
            res.status(200).json({ message: 'Board deleted successfully', board });
        } catch (error) {
            if (error.message === 'Board not found') {
                return res.status(404).json({ message: error.message });
            }
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new BoardController();
