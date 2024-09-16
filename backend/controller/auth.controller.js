const bcrypt = require('bcryptjs');

const userModel = require('../models/user.model');
const generateVerificationToken = require('../utils/generateVerificationToken');


const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // For input all the required fields
        if (!name || !email || !password) {
            throw new Error("All fields must be required");
        }

        // Check if email already exists
        const userAlreadyExists = await userModel.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        // hash password using bcryptjs
        const hashedPassword = await bcrypt.hash(password, 10);

        // For Verification Code
        const verificationToken = generateVerificationToken();

        const user = new User({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // for 24 Hours
        })
        
        await user.save();
        console.log("New User saved Sucessfully");

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

const login = async (req, res) => {
    res.send("login route")
}

const logout = async (req, res) => {
    res.send("logout route")
}

module.exports = { signup, login, logout }