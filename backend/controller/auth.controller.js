const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userModel = require('../models/user.model');
const generateVerificationToken = require('../utils/generateVerificationToken');
const generateTokenAndSetCookie = require('../utils/generateTokenAndSetCookie');
const { sendVerificationmail, sendWelcomemail } = require('../mailtrap/email');

// FOR SIGNUP USER
const signup = async (req, res) => {
    // extract the eamil address,password,name field from the body
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

        // hash the password using bcryptjs algorithm
        const hashedPassword = await bcrypt.hash(password, 10);

        // generate a verification code in Database 
        const verificationToken = generateVerificationToken();

        // for Saved the user data
        const user = new userModel({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // for 24 Hours
        })
        await user.save();

        // Set JWT Token and cookies in browser
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
};

// FOR VERIFY EMAIL ADDRESS
const verifyEmail = async (req, res) => {
    // extract the verification code from the body
    // passes the verification code form frontend the recived code in email address and store in database()
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

        // For response Messege Code
        res.status(200).json({ success: true, message: "Email Verification successful" });
        console.log("Email Verification successful");


    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
        console.log("Error: " + error.message);
    }

};

// FOR LOGIN USER
const login = async (req, res) => {
    // extract the eamil address from the body wich store in database
    const { email, password } = req.body;
    try {
        // Check if user have accout or valid email address
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Email not found" });
        }

        // Check if password is correct  or valid
        const isPasswordvalid = await bcrypt.compare(password, user.password);
        if (!isPasswordvalid) {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }

        // For set cookies
        generateTokenAndSetCookie(res, user._id);

        // user last login
        user.lastLogin = new Date();

        // save the login user
        await user.save();

        // For response Messege Code
        res.status(200).json({
            success: true, message: "Login successful", user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                lastLogin: user.lastLogin
            }
        });

        console.log("Login successful");

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        console.log("Error in login user: " + error.message);
    }

};

// FOR LOGOUT
const logout = async (req, res) => {
    res.clearCookie("token")
    res.status(200).json({ success: true, message: "Logout successful" });
    console.log("Logout successful");

};

// FOR FORGOT PASSWORD
const forgotPassword = async (req, res) => {
    // extract the eamil address from the body wich store in database
    const { email } = req.body;

    try {
        // Check if user have accout or valid email address
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Email not found" });
        }

        // generate a new reset token
        const resetToken = crypto.randombytes(20).toString('hex');

        // Token expiration
        const resetTokenExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

        // update the database
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        // save the updated user
        await user.save();

        // Send Reset password link with token in email notification to user
        await sendResetPasswordEmail(user.email, `${process.env.CLIENT_URL}/resetPassword/${resetToken}`);

        // For response Messege Code
        res.status(200).json({ success: true, message: "Reset Password link sent to your email" });
        console.log("Reset Password link sent to your email");

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        console.log("Error in forgot password: " + error.message);
    }
};

module.exports = { signup, login, logout, verifyEmail, forgotPassword }