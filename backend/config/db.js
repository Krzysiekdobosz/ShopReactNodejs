const mongoose = require('mongoose');
const { mongoUri } = require('./env');

const connectDB = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Could not connect to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
