const User = require("../models/User")

// Function which creates an User on the DB
exports.createUser = async (req, res) => {
    try {
        // Create the new user using the User Model
        const user = new User(req.body);

        // Saving the new user
        await user.save();

        // Sending the response
        res.status(200).send('User created');
    } catch (error) {
        res.status(400).send('There has been an error');
    }
}