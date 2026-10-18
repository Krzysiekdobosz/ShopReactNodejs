const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { HttpError, asyncHandler } = require('../utils/httpError');

const MAX_QUANTITY = 99;

const parseQuantity = (value, fallback = 1) => {
    const quantity = value === undefined ? fallback : Number(value);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) {
        throw new HttpError(400, `Quantity must be a whole number between 1 and ${MAX_QUANTITY}`);
    }
    return quantity;
};

const findOrCreateCart = async (userId) => {
    const cart = await Cart.findOne({ user: userId });
    return cart || new Cart({ user: userId, products: [] });
};

const sendCart = async (cart, res) => {
    await cart.populate('products.product');
    // Products deleted from the catalogue are dropped from the response.
    cart.products = cart.products.filter((item) => item.product);
    res.json(cart);
};

exports.getCart = asyncHandler(async (req, res) => {
    const cart = await findOrCreateCart(req.user._id);
    await sendCart(cart, res);
});

exports.addToCart = asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const quantity = parseQuantity(req.body.quantity);

    const product = await Product.findById(productId);
    if (!product) {
        throw new HttpError(404, 'Product not found');
    }

    const cart = await findOrCreateCart(req.user._id);
    const item = cart.products.find((p) => p.product.equals(product._id));
    if (item) {
        item.quantity = Math.min(item.quantity + quantity, MAX_QUANTITY);
    } else {
        cart.products.push({ product: product._id, quantity });
    }

    await cart.save();
    await sendCart(cart, res);
});

exports.updateQuantity = asyncHandler(async (req, res) => {
    const quantity = parseQuantity(req.body.quantity);
    const cart = await findOrCreateCart(req.user._id);
    const item = cart.products.find((p) => p.product.toString() === req.params.productId);
    if (!item) {
        throw new HttpError(404, 'Product is not in the cart');
    }

    item.quantity = quantity;
    await cart.save();
    await sendCart(cart, res);
});

exports.removeFromCart = asyncHandler(async (req, res) => {
    const cart = await findOrCreateCart(req.user._id);
    cart.products = cart.products.filter((p) => p.product.toString() !== req.params.productId);
    await cart.save();
    await sendCart(cart, res);
});

exports.clearCart = asyncHandler(async (req, res) => {
    const cart = await findOrCreateCart(req.user._id);
    cart.products = [];
    await cart.save();
    res.json(cart);
});
