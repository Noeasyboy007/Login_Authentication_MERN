const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        console.log('User not logged in or no have a JWT');
        return res.status(401).json({ error: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            console.log("Token is not valid");
            return res.status(401).json({ error: "Token is not valid" });
        }
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error("Error verifying token", error);
        return res.status(401).json({ success: false, message: "server error" })
    }
}
module.exports = verifyToken;