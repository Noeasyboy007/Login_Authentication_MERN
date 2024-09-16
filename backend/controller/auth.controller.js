const bcrypt = require('bcryptjs');

const userModel = require('../models/user.model');
const generateVerificationToken = require('../utils/generateVerificationToken');
const generateTokenAndSetCookie = require('../utils/generateTokenAndSetCookie');
const { sendVerificationmail, sendWelcomemail } = require('../mailtrap/email');

// For Signup User
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
        await sendVerificationmail(user.email, verificationToken);

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

// For Verify Email Address
const verifyEmail = async (req, res) => {
    // passes the verification code form frontend the recived code in email address
    const { code } = req.body;
    try {
        const user = await userModel.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() },
        })

        // Checke the verification code is correct or expired
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired Verification Code" });
        }

        // update the database
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        // save the updated user
        await user.save();

        // Send Welcome email notification to signup user
        await sendWelcomemail(user.email, user.name)


    } catch (error) {

    }

}

const login = async (req, res) => {
    res.send("login route")
}

const logout = async (req, res) => {
    res.send("logout route")
}

module.exports = { signup, login, logout, verifyEmail }