const express = require('express');
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(authMiddleware, getCart)
    .post(authMiddleware, addToCart);

router.delete('/:productId', authMiddleware, removeFromCart);

module.exports = router;
