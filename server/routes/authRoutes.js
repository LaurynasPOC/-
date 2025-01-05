const express = require("express");
const { loginUser, registerUser } = require("../controllers/authController");

const router = express.Router();

// Login endpoint
router.post("/login", loginUser);

// Register endpoint
router.post("/register", registerUser);

module.exports = router;
