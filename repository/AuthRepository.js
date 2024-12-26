const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const users = require('../model/Users');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'trust10nft@gmail.com',
        pass: 'Messi1233'
    }
});

module.exports = {
    async login(email, password) {
        const user = await users.findOne({ email });

        if (!user) {
            throw new Error('User not found');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role, UserNom: user.nom, UserEmail: user.email },
            'your-secret-key',  // Use your actual JWT secret key
            { expiresIn: 60 * 60 }  // Token expires in 1 hour
        );

        return { token };
    },

    verifyToken(token) {
        try {
            const decoded = jwt.verify(token, 'your-secret-key');  // Use your actual JWT secret key
            return decoded;
        } catch (err) {
            throw new Error('Invalid token');
        }
    },

    async authorize(req, roles) {
        const token = req.headers.authorization;

        if (!token) {
            throw new Error('Missing token');
        }

        const { role } = this.verifyToken(token);

        if (!roles.includes(role)) {
            throw new Error('Unauthorized');
        }
    },

    async requestPasswordReset(email) {
        const user = await users.findOne({ email });

        if (!user) {
            throw new Error('User not found');
        }

        // Generate a JWT for password reset with a short expiration
        const resetToken = jwt.sign(
            { userId: user._id, email: user.email },
            'your-secret-key',  // Use your actual JWT secret key
            { expiresIn: '1h' }  // Token expires in 1 hour
        );

        const mailOptions = {
            from: 'no-reply@noreplytest.com',  // Sender address (adjust as necessary)
            to: user.email,  // Receiver's email
            subject: 'Password Reset Request',  // Subject line
            html: `<p>You requested a password reset. Click <a href="http://localhost:3001/reset-password/${resetToken}">here</a> to reset your password.</p>`,  // HTML body content
        };

        // Send the email with the password reset link
        await transporter.sendMail(mailOptions);
        return { message: 'Password reset email sent' };
    },

    async resetPassword(token, newPassword) {
        try {
            // Verify the reset token
            const decoded = jwt.verify(token, 'your-secret-key');  // Use your actual JWT secret key
            const user = await users.findById(decoded.userId);

            if (!user) {
                throw new Error('User not found');
            }

            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;

            // Save the new password to the database
            await user.save();
            return { message: 'Password has been reset successfully' };
        } catch (err) {
            throw new Error('Invalid or expired token');
        }
    }
};
