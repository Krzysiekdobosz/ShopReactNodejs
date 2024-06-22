const express = require('express');
const { getCart, addItemToCart, removeItemFromCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:userId', protect, getCart);
router.post('/:userId/:productId', protect, addItemToCart);
router.delete('/:userId/:productId', protect, removeItemFromCart);

module.exports = router;
