const express = require('express');
const { registerUser, loginUser, getAllUsers, deleteUser } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', protect, admin, getAllUsers);
router.delete('/:id', protect, admin, deleteUser);

module.exports = router;
