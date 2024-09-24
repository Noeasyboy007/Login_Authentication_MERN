const express = require("express");
const { signup, login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth } = require("../controller/auth.controller");
const verifyToken = require("../middleware/verifyToken");


const router = express.Router();

// for Middleware to  check is user login authenticated or not
router.get("/check-auth", verifyToken, checkAuth)

router.post("/signup", signup);

router.post("/verify-email", verifyEmail);

router.post("/login", login);

router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);

router.post("/resetPassword/:token", resetPassword);


module.exports = router;