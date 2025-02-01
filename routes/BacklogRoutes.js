const express = require('express');
const router = express.Router();
const backlogController = require('../controller/BacklogController');

router.get('/Backlogs', backlogController.getAllBacklogs);
router.get('/Backlogs/id/:id', backlogController.getBacklogById);
router.post('/Backlogs', backlogController.createBacklog);
router.put('/Backlogs/:id', backlogController.updateBacklog);
router.delete('/Backlogs/:id', backlogController.deleteBacklog);
router.get('/Backlogs/projectId/:projectId', backlogController.getBacklogsByProjectId);
router.get('/Backlogs/user/:userId', backlogController.getBacklogsByUser);

module.exports = router;
