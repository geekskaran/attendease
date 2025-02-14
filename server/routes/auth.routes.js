// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const auth = require('../middleware/auth.middleware');

// Auth routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/profile', auth, authController.getProfile);

module.exports = router;