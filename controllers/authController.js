const User = require("../models/User")
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res) => {
    // Destructuring of body fields
    const { email, password } = req.body

    // Return validation errors if there exists
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors });
    }

    try {
        // Check if user is registered
        let user = await User.findOne({ email });
        if(!user) return res.status(400).json({ msg: 'User does not exist' });

        // Check if the password is correct
        const passwordCheck = await bcrypt.compare(password, user.password);
        if(!passwordCheck) return res.status(400).json({ msg: 'Password is incorrect' });

        // Creating the JWT
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload, process.env.SECRETJWT, { expiresIn: "1h" },
            (error, token) => {
                if(error) throw error;
                return res.status(200).json({ token });
            }
        );
    } catch (error) {
        return res.status(400).json({ msg: error });
    }
}