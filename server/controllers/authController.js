const passport = require("passport");
const jwt = require("jsonwebtoken");
const {
  findUserByEmail,
  validatePassword,
  generateToken,
  createUser,
} = require("../services/authService");
const logger = require("../utils/logger");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await validatePassword(password, user.password);

    const token = generateToken(user.id);
    res.status(200).json({ token, username: user.username });
  } catch (error) {
    logger.error(`Login error for user ${email}: ${error.message}`);
    const statusCode = error.message === "Password incorrect" ? 401 : 500;
    res.status(statusCode).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  const { username, email, password, password2 } = req.body;

  if (!username || !email || !password || !password2) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await createUser(username, email, password, password2);
    res.status(201).json(result);
  } catch (error) {
    logger.error("Error in user registration:", error.message);

    if (error.message === "User already exists") {
      return res.status(409).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

const googleCallback = (req, res) => {
  const { token, username } = req.user;
  const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";
  res.redirect(
    `${frontendURL}/google-auth?token=${token}&username=${username}`
  );
};

const logoutUser = (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};

const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

const getCurrentUser = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "yourSecretKey"
    );
    res.status(200).json(decoded);
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = {
  loginUser,
  registerUser,
  getCurrentUser,
  logoutUser,
  googleCallback,
  googleLogin,
};
