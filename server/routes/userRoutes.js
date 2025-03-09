const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { requireVerifiedEmail } = require("../utils/middleware");

// Protected routes for logged-in & verified users
router.get("/", requireVerifiedEmail, userController.getUser);
router.post("/", requireVerifiedEmail, userController.addOrUpdateUser);

module.exports = router;
