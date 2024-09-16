const userModel = require('../models/user.model')

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        //For input all the required fields
        if (!name || !email || !password) {
            throw new Error("All fields must be required");
        }

        //Check if email already exists
        const userAlreadyExists = await userModel.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

    
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