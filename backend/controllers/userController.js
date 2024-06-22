const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.create({ username, password });
        const token = jwt.sign({ id: user._id, roles: user.roles }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && (await user.matchPassword(password))) {
            const token = jwt.sign({ id: user._id, roles: user.roles }, process.env.JWT_SECRET, {
                expiresIn: '1d'
            });
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
