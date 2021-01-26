// Routes relationed with users
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create an user => /api/users/create
router.post('/create', userController.createUser);

module.exports = router;