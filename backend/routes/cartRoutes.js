const express = require('express');
const { addToCart, getCart, updateQuantity, removeFromCart, clearCart } = require('../controllers/cartController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.route('/')
    .get(getCart)
    .post(addToCart)
    .delete(clearCart);

router.route('/:productId')
    .put(updateQuantity)
    .delete(removeFromCart);

module.exports = router;
