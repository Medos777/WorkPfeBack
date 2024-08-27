const express=require('express');
const router= express.Router();
const AuthController = require('../controller/AuthController');
router.post('/login', AuthController.login);
// Protected route that requires authentication
router.get('/', AuthController.authenticate, (req, res) => {
    res.json({ message: 'You are authorized to access this resource' });
});
module.exports = router;
