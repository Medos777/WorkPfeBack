const express = require('express');
const router = express.Router();
const AuthController = require('../controller/AuthController');

// Route for user login
router.post('/login', AuthController.login);

// Protected route that requires authentication
router.get('/', AuthController.authenticate, (req, res) => {
    res.json({ message: 'You are authorized to access this resource' });
});

// New route for requesting a password reset
router.post('/request-password-reset', AuthController.requestPasswordReset);

// New route for resetting the password using a token
router.post('/reset-password', AuthController.resetPassword);

module.exports = router;
