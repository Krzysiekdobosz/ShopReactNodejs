const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret, jwtExpiresIn } = require('../config/env');
const { HttpError, asyncHandler } = require('../utils/httpError');

const signToken = (user) => jwt.sign({ userId: user.id, role: user.role }, jwtSecret, { expiresIn: jwtExpiresIn });

exports.register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new HttpError(400, 'Name, email and password are required');
    }
    if (password.length < 6) {
        throw new HttpError(400, 'Password must be at least 6 characters long');
    }

    const user = await User.create({ name, email, password });
    res.status(201).json({ token: signToken(user), user: user.toPublic() });
});

exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: String(email || '').toLowerCase() }).select('+password');

    if (!user || !(await user.comparePassword(password || ''))) {
        throw new HttpError(400, 'Invalid credentials');
    }

    res.json({ token: signToken(user), user: user.toPublic() });
});

exports.me = (req, res) => {
    res.json({ user: req.user.toPublic() });
};
