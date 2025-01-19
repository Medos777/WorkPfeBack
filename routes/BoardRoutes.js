const express = require('express');
const router = express.Router();
const boardController = require('../controller/BoardController');

router.get('/boards', boardController.getAllBoards);
router.get('/boards/:id', boardController.getBoardById);
router.get('/boards/project/:projectId', boardController.getBoardsByProject);
router.post('/boards', boardController.createBoard);
router.put('/boards/:id', boardController.updateBoard);
router.delete('/boards/:id', boardController.deleteBoard);

module.exports = router;
