const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.createProduct = async (req, res) => {
    const { name, description, price } = req.body;
    try {
        const product = await Product.create({ name, description, price });
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    const { name, description, price } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, { name, description, price }, { new: true });
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
