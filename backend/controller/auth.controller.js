const bcrypt = require('bcryptjs');

const userModel = require('../models/user.model');
const generateVerificationToken = require('../utils/generateVerificationToken');
const generateTokenAndSetCookie = require('../utils/generateTokenAndSetCookie');


const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // For input all the required fields
        if (!name || !email || !password) {
            throw new Error("All fields must be required");
        }

        // Check if email already exists
        const userAlreadyExists = await userModel.findOne({ email });
        // console.log("user already exists", userAlreadyExists);

        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        // hash password using bcryptjs
        const hashedPassword = await bcrypt.hash(password, 10);

        // For Verification Code
        const verificationToken = generateVerificationToken();

        // for Saved the user 
        const user = new userModel({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // for 24 Hours
        })
        await user.save();

        // Set JWT Token
        generateTokenAndSetCookie(res, user._id);

        //send verification Token in User mail -> using mailtrap
        sendVerificationmail(user.email, verificationToken);

        // For response Messege Code
        res.status(201).json({
            success: true, message: "New User signup successfully",
            user: {
                ...user._doc,
                password: undefined,
            }
        });
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