const Product = require('../models/Product');
const { HttpError, asyncHandler } = require('../utils/httpError');

const sendSaved = async (user, res) => {
    await user.populate('savedItems');
    res.json(user.savedItems.filter(Boolean));
};

exports.getSavedItems = asyncHandler(async (req, res) => {
    await sendSaved(req.user, res);
});

exports.addToSaved = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.body.productId);
    if (!product) {
        throw new HttpError(404, 'Product not found');
    }

    if (!req.user.savedItems.some((id) => id.equals(product._id))) {
        req.user.savedItems.push(product._id);
        await req.user.save();
    }
    await sendSaved(req.user, res);
});

exports.removeFromSaved = asyncHandler(async (req, res) => {
    req.user.savedItems = req.user.savedItems.filter((id) => id.toString() !== req.params.productId);
    await req.user.save();
    await sendSaved(req.user, res);
});
