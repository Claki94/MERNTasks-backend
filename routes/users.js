// Routes relationed with users
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { createUserValidators } = require('../validators/validators');

// Create an user => /api/users/create
router.post('/create', 
    createUserValidators,
    userController.createUser
);

module.exports = router;