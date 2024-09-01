const express=require('express');
const router= express.Router();
const ProjectController = require('../controller/ProjectController');
router.get('/projects',ProjectController.findAll);
router.get('/projects/id/:id',ProjectController.findById);
router.post('/projects',ProjectController.create);
router.put('/projects/:id',ProjectController.update);
router.delete('/projects/:id',ProjectController.delete);

module.exports = router;