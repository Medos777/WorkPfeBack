const AuthService = require('../service/AuthService');

module.exports = {
    async login(req, res) {
        const { email, password, role } = req.body;

        try {
            const { token } = await AuthService.login(email, password, role);
            res.json({ token });
        } catch (err) {
            res.status(401).json({ message: err.message });
        }
    },

    async authenticate(req, res, next) {
        try {
            await AuthService.authenticate(req, ['etudiant', 'enseignant', 'admin']);
            next();
        } catch (err) {
            res.status(401).json({ message: err.message });
        }
    },

    // New method to handle password reset requests
    async requestPasswordReset(req, res) {
        const { email } = req.body;

        try {
            const response = await AuthService.requestPasswordReset(email);
            res.json(response);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // New method to handle the actual password reset
    async resetPassword(req, res) {
        const { token, newPassword } = req.body;

        try {
            const response = await AuthService.resetPassword(token, newPassword);
            res.json(response);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
};
