const User = require("../models/User")
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// Function which creates an User on the DB
exports.createUser = async (req, res) => {
    // Destructuring of body fields
    const { email, password } = req.body

    // Return validation errors if there exists
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors });
    }

    try {
        
        // Check if there exists one user with that email
        let user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({ msg: 'An user with that email already exists' });
        }

        // Create the new user using the User Model
        user = new User(req.body);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

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
        return res.status(400).json({ msg: 'There has been an error' });
    }
}