const AuthRepository = require('../repository/AuthRepository');

module.exports = {
    async login(email, password) {
        try {
            const { token } = await AuthRepository.login(email, password);
            console.log(token);
            return { token };
        } catch (err) {
            throw new Error(err.message);
        }
    },

    async authenticate(req, roles) {
        try {
            await AuthRepository.authorize(req, roles);
        } catch (err) {
            throw new Error(err.message);
        }
    },

    // New function to request a password reset
    async requestPasswordReset(email) {
        try {
            const response = await AuthRepository.requestPasswordReset(email);
            return response;  // It should return a message indicating the email has been sent
        } catch (err) {
            throw new Error(err.message);
        }
    },

    // Function to reset the password
    async resetPassword(token, newPassword) {
        try {
            const response = await AuthRepository.resetPassword(token, newPassword);
            return response;
        } catch (err) {
            throw new Error(err.message);
        }
    }
};
