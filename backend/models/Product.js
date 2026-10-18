const mongoose = require('mongoose');

const CATEGORIES = ['Mountain', 'Road', 'City', 'Kids', 'Accessories'];

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        price: { type: Number, required: true, min: 0 },
        category: { type: String, required: true, enum: CATEGORIES },
        image: { type: String, default: '', trim: true },
        stock: { type: Number, default: 10, min: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
module.exports.CATEGORIES = CATEGORIES;
