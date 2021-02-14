const { check } = require('express-validator');

exports.createUserValidators = [
    check('name', 'The name is required').notEmpty(),
    check('email', 'It must be a valid email').isEmail(),
    check('password', 'It must have a minimum length of 6 characters').isLength({min: 6})
];