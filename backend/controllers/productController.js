const Product = require('../models/Product');
const Cart = require('../models/Cart');
const User = require('../models/User');
const { HttpError, asyncHandler } = require('../utils/httpError');
const { buildProductQuery } = require('../utils/productQuery');

const FIELDS = ['name', 'description', 'price', 'category', 'image', 'stock'];
const pick = (body) => Object.fromEntries(FIELDS.filter((key) => key in body).map((key) => [key, body[key]]));

exports.getProducts = asyncHandler(async (req, res) => {
    const { filter, sort } = buildProductQuery(req.query);
    const products = await Product.find(filter).sort(sort);
    res.json(products);
});

exports.getCategories = (req, res) => {
    res.json(Product.CATEGORIES);
};

exports.getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        throw new HttpError(404, 'Product not found');
    }
    res.json(product);
});

exports.createProduct = asyncHandler(async (req, res) => {
    const product = await Product.create(pick(req.body));
    res.status(201).json(product);
});

exports.updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, pick(req.body), { new: true, runValidators: true });
    if (!product) {
        throw new HttpError(404, 'Product not found');
    }
    res.json(product);
});

exports.deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
        throw new HttpError(404, 'Product not found');
    }

    // Keep carts and saved lists consistent with the catalogue.
    await Promise.all([
        Cart.updateMany({}, { $pull: { products: { product: product._id } } }),
        User.updateMany({}, { $pull: { savedItems: product._id } }),
    ]);

    res.json({ msg: 'Product removed', id: product.id });
});
