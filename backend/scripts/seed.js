const mongoose = require('mongoose');
const { mongoUri } = require('../config/env');
const User = require('../models/User');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
// The same catalogue powers the in-browser demo of the frontend.
const catalog = require('../../frontend/src/api/catalog.json');

const seed = async () => {
    await mongoose.connect(mongoUri);
    await Promise.all([User.deleteMany({}), Product.deleteMany({}), Cart.deleteMany({})]);

    await User.create([
        { name: 'Admin', email: 'admin@example.com', password: 'admin123', role: 'admin' },
        { name: 'Jan Kowalski', email: 'user@example.com', password: 'user123' },
    ]);
    await Product.insertMany(catalog);

    console.log(`Seeded ${catalog.length} products. Logins: admin@example.com / admin123, user@example.com / user123`);
    await mongoose.disconnect();
};

seed().catch((error) => {
    console.error(error);
    process.exit(1);
});
