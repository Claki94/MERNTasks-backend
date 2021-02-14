// Routes relationed with authentication
const express = require('express');
const router = express.Router();
const { authValidators } = require('../validators/validators');
const authController = require('../controllers/authController');

// Authenticate an user => /api/auth
router.get('/',
    authValidators,
    authController.authenticateUser
);

module.exports = router;