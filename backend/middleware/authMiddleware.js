const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, 'jwtSecret');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

exports.adminMiddleware = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId);
        if (user.role !== 'admin') {
            return res.status(403).json({ msg: 'Admin resource. Access denied.' });
        }
        next();
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};
