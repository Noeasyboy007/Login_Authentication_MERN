const express = require("express");
const { signup, login, logout } = require("../controller/auth.controller")

const router = express.Router();

router.post("/signup", signup)
router.get("/login", login)
router.get("/logout", logout)


module.exports = router;