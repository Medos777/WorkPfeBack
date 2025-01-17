const express = require('express');
const router = express.Router();
const AuthController = require('../controller/AuthController');

router.post('/login', AuthController.login);
router.get('/', AuthController.authenticate, (req, res) => {
    res.json({ message: 'You are authorized to access this resource' });
});
router.post('/request-password-reset', AuthController.requestPasswordReset);
router.post('/reset-password', AuthController.resetPassword);

module.exports = router;
