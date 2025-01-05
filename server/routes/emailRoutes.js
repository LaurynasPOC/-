const express = require("express");
const { verifyEmail } = require("../controllers/emailController");

const router = express.Router();

router.get("/verify-email", verifyEmail);

module.exports = router;
