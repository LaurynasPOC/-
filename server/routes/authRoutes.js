const passport = require("passport");
const express = require("express");
const {
  loginUser,
  registerUser,
  getCurrentUser,
  logoutUser,
  googleCallback,
  googleLogin,
} = require("../controllers/authController");

const router = express.Router();

// Login endpoint
router.post("/login", loginUser);

// Register endpoint
router.post("/register", registerUser);

router.get("/google", googleLogin);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  googleCallback
);

// Logout Route
router.get("/logout", logoutUser);

// Current User Route
router.get("/current_user", getCurrentUser);

module.exports = router;
