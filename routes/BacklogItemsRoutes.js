const express=require('express');
const router= express.Router();
const backlogItemsController = require('../controller/BacklogItemsController');
router.get('/BacklogItems',backlogItemsController.getAllBacklogItems());
router.get('/BacklogItems/id/:id',backlogItemsController.getBacklogItemById());
router.post('/BacklogItems',backlogItemsController.createBacklogItem());
router.put('/BacklogItems/:id',backlogItemsController.updateBacklogItem());
router.delete('/BacklogItems/:id',backlogItemsController.deleteBacklogItem());

module.exports = router;