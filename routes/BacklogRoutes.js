const express = require('express');
const router = express.Router();
const backlogController = require('../controller/BacklogController');

router.get('/Backlogs', backlogController.getAllBacklogs);
router.get('/Backlogs/id/:id', backlogController.getBacklogById);
router.post('/Backlogs', backlogController.createBacklog);
router.put('/Backlogs/:id', backlogController.updateBacklog);
router.delete('/Backlogs/:id', backlogController.deleteBacklog);

module.exports = router;
