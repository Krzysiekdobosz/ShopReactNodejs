const express = require('express');
const { getSavedItems, addToSaved, removeFromSaved } = require('../controllers/savedController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.route('/')
    .get(getSavedItems)
    .post(addToSaved);

router.delete('/:productId', removeFromSaved);

module.exports = router;
