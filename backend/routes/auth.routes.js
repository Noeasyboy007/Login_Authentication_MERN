const express = require("express");
const { signup, login, logout, verifyEmail, forgotPassword } = require("../controller/auth.controller")

const router = express.Router();

router.post("/signup", signup)

router.post("/verify-email", verifyEmail)

router.post("/login", login)

router.post("/logout", logout)

router.post("forgot-password", forgotPassword)


module.exports = router;