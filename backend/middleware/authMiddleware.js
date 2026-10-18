const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret } = require('../config/env');
const { HttpError, asyncHandler } = require('../utils/httpError');

exports.authMiddleware = asyncHandler(async (req, res, next) => {
    const [scheme, token] = (req.header('Authorization') || '').split(' ');
    if (scheme !== 'Bearer' || !token) {
        throw new HttpError(401, 'No token, authorization denied');
    }

    let payload;
    try {
        payload = jwt.verify(token, jwtSecret);
    } catch {
        throw new HttpError(401, 'Token is not valid');
    }

    const user = await User.findById(payload.userId);
    if (!user) {
        throw new HttpError(401, 'User no longer exists');
    }

    req.user = user;
    next();
});

exports.adminMiddleware = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return next(new HttpError(403, 'Admin resource. Access denied.'));
    }
    next();
};
