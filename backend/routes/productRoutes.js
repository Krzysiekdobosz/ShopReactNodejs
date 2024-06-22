const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
