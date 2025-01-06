const {
  findUserByEmail,
  validatePassword,
  generateToken,
  createUser,
} = require("../services/authService");
const logger = require("../utils/logger");

// Login user
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
    res.status(200).json({ token });
  } catch (error) {
    logger.error(`Login error for user ${email}: ${error.message}`);
    const statusCode = error.message === "Password incorrect" ? 401 : 500;
    res.status(statusCode).json({ error: error.message });
  }
};

// Register user
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

module.exports = { loginUser, registerUser };
