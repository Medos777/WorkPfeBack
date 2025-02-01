const express = require('express');
const router = express.Router();
const backlogItemsController = require('../controller/BacklogItemsController');

// Remove the parentheses to pass the function reference instead of calling it
router.get('/BacklogItems', backlogItemsController.getAllBacklogItems);
router.get('/BacklogItems/id/:id', backlogItemsController.getBacklogItemById);
router.post('/BacklogItems', backlogItemsController.createBacklogItem);
router.put('/BacklogItems/:id', backlogItemsController.updateBacklogItem);
router.delete('/BacklogItems/:id', backlogItemsController.deleteBacklogItem);
router.get('/BacklogItems/user/:userId', backlogItemsController.getBacklogItemsByUser);

module.exports = router;
