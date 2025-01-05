const {
  findUserByEmail,
  validatePassword,
  generateToken,
} = require("../services/authService");
const logger = require("../utils/logger");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Find user by email
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Validate password
    await validatePassword(password, user.password);

    // Generate JWT token
    const token = generateToken(user.id);

    res.status(200).json({ token });
  } catch (error) {
    logger.error(`Login error for user ${email}: ${error.message}`);
    const statusCode = error.message === "Password incorrect" ? 401 : 500;
    res.status(statusCode).json({ error: error.message });
  }
};

module.exports = { loginUser };
