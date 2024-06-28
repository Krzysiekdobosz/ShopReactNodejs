const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ user: req.user });
        if (!cart) {
            cart = new Cart({ user: req.user, products: [{ product: productId, quantity }] });
        } else {
            const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
            if (productIndex >= 0) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }
        }
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user }).populate('products.product');
        res.json(cart);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.removeFromCart = async (req, res) => {
    const { productId } = req.params;
    try {
        const cart = await Cart.findOne({ user: req.user });
        cart.products = cart.products.filter(p => p.product.toString() !== productId);
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).send('Server error');
    }
};
