const express=require('express');
const router= express.Router();
const UsersController = require('../controller/UsersController');
router.get('/users',UsersController.findAll);
router.get('/users/:id',UsersController.findById);

router.post('/users',UsersController.create);
router.put('/users/:id',UsersController.update);
router.delete('/users/:id',UsersController.delete);

module.exports = router;