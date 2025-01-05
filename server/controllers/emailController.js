const {
  verifyEmailToken,
  updateVerificationStatus,
} = require("../services/emailService");
const logger = require("../utils/logger");

const verifyEmail = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: "Invalid or missing token" });
  }

  try {
    // Verify the token exists and fetch the user
    const user = await verifyEmailToken(token);

    // Update the user's verification status
    await updateVerificationStatus(token);

    logger.info(`Email verified successfully for user: ${user.email}`);
    res.status(200).json({ message: "Email verified successfully!" });
  } catch (err) {
    logger.error(err.message);
    res.status(400).json({ error: err.message });
  }
};

module.exports = { verifyEmail };
