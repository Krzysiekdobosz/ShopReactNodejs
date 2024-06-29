const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.userId;

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, products: [] });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        const itemIndex = cart.products.findIndex(p => p.product.toString() === productId);
        if (itemIndex > -1) {
            cart.products[itemIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();
        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        let cart = await Cart.findOne({ user: userId }).populate('products.product');
        if (!cart) {
            cart = new Cart({ user: userId, products: [] });
            await cart.save();
        }
        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        const productId = req.params.productId;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        cart.products = cart.products.filter(p => p.product.toString() !== productId);

        await cart.save();
        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
