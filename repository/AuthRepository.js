const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../model/Users');
module.exports= {
    async login(email, password) {
        const user = await users.findOne({ email });

        if (!user) {
            throw new Error('User not found');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign({ userId: user._id, role:user.role ,UserNom: user.nom, UserEmail: user.email},'your-secret-key', {
            expiresIn: 60 * 60 ,
        });
        console.log("the token is"+token);
        return { token };
    },
    verifyToken(token) {
        try {
            const decoded = jwt.verify(token, 'your-secret-key');
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
    }

}