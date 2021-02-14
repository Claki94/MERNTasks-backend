const { check } = require('express-validator');

// Validators by field
const email = {
    isEmail: check('email', 'It must be a valid email').isEmail()
};
const name = {
    required: check('name', 'The name is required').notEmpty()
};
const password = {
    minLength: check('password', 'It must have a minimum length of 6 characters').isLength({min: 6})
};

exports.createUserValidators = [
    name.required,
    email.isEmail,
    password.minLength
];

exports.authValidators = [
    email.isEmail,
    password.minLength
];