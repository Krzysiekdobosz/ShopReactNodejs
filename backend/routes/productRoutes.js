const express = require('express');
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(authMiddleware, adminMiddleware, createProduct);

router.route('/:id')
    .get(getProductById)
    .put(authMiddleware, adminMiddleware, updateProduct)
    .delete(authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;
