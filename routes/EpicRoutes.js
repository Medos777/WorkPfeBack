const express = require('express');
const router = express.Router();
const EpicController = require('../controller/EpicController');

// Create a new epic
router.post('/epics', EpicController.createEpic);

// Get all epics (with optional filters in query params)
router.get('/epics', EpicController.getAllEpics);

// Get epics by project ID (must come before /:id route)
router.get('/epics/project/:projectId', EpicController.getEpicsByProject);

// Get epic by ID
router.get('/epics/:id', EpicController.getEpicById);

// Update epic
router.put('/epics/:id', EpicController.updateEpic);

// Delete epic
router.delete('/epics/:id', EpicController.deleteEpic);

// Update epic progress
router.post('/epics/:id/progress', EpicController.updateEpicProgress);

// Add watcher to epic
router.post('/epics/:id/watchers', EpicController.addWatcher);

// Remove watcher from epic
router.delete('/epics/:id/watchers', EpicController.removeWatcher);
router.get('/epics/projectId/:projectId', EpicController.getEpicsByProjectId);
module.exports = router;