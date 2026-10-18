const mongoose = require('mongoose');

exports.notFound = (req, res) => {
    res.status(404).json({ msg: `Route ${req.method} ${req.originalUrl} not found` });
};

// eslint-disable-next-line no-unused-vars
exports.errorHandler = (err, req, res, next) => {
    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ msg: Object.values(err.errors).map((e) => e.message).join(', ') });
    }
    if (err instanceof mongoose.Error.CastError) {
        return res.status(400).json({ msg: `Invalid ${err.path}` });
    }
    if (err.code === 11000) {
        return res.status(409).json({ msg: 'This email is already registered' });
    }

    const status = err.status || 500;
    if (status >= 500) console.error(err);
    res.status(status).json({ msg: status >= 500 ? 'Server error' : err.message });
};
