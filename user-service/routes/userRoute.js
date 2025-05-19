const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const {authMiddleware, authorizeRoles} = require('../middleware/authMiddleware');

// Public
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected
router.get('/profile', authMiddleware, userController.getProfile);
router.get('/phoneNumber', authMiddleware, userController.getPhoneNumber);
router.put('/profile/:id', authMiddleware, userController.updateUser);
router.delete('/profile/:id', authMiddleware, userController.deleteUser);
router.post('/forgot-password', authMiddleware, userController.forgotPassword);
router.post('/reset-password/:token', authMiddleware, userController.resetPassword);


// Admin only - Extend this check in future
router.get('/all', authMiddleware, authorizeRoles('admin'), userController.getAllUsers);


module.exports = router;

