const express=require('express');
const router= express.Router();
const sprintController = require('../controller/SprintController');
router.get('/sprints',sprintController.findAll);
router.get('/sprints/id/:id',sprintController.findById);
router.get('/sprints/project/:project', sprintController.findByProject);
router.post('/sprints',sprintController.create);
router.put('/sprints/:id',sprintController.update);
router.delete('/sprints/:id',sprintController.delete);

module.exports = router;