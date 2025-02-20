const express=require('express');
const router= express.Router();
const ProjectController = require('../controller/ProjectController');
router.get('/projects',ProjectController.findAll);
router.get('/projects/id/:id',ProjectController.findById);
router.post('/projects',ProjectController.create);
router.put('/projects/:id',ProjectController.update);
router.delete('/projects/:id',ProjectController.delete);
router.get('/projects/teams/:teamId', ProjectController.findByTeams);

router.get('/projects/projectKey/:projectKey',ProjectController.findByProjectKey);
module.exports = router;