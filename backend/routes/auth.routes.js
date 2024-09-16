const express = require("express");
const { signup, login, logout, verifyEmail } = require("../controller/auth.controller")

const router = express.Router();

router.post("/signup", signup)
router.post("/verify-email", verifyEmail)
router.get("/login", login)
router.get("/logout", logout)


module.exports = router;