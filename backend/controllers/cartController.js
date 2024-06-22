const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.params.userId }).populate('items.product');
        res.json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.addItemToCart = async (req, res) => {
    const { userId, productId } = req.params;
    const { quantity } = req.body;
    try {
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const product = await Product.findById(productId);
        const itemIndex = cart.items.findIndex(item => item.product.equals(productId));

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product, quantity });
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.removeItemFromCart = async (req, res) => {
    const { userId, productId } = req.params;
    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => !item.product.equals(productId));
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
