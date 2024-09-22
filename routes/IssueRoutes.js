const express=require('express');
const router= express.Router();
const issueController = require('../controller/IssueController');
router.get('/issues',issueController.findAll);
router.get('/issues/id/:id',issueController.findById);
router.get('/issues/project/:project', issueController.findByProject);
router.post('/issues',issueController.create);
router.put('/issues/:id',issueController.update);
router.delete('/issues/:id',issueController.delete);

module.exports = router;