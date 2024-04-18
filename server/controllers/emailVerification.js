const emailVerification = require("express").Router();

emailVerification.get("/verify-email", async (req, res) => {
  try {
    const { token } = req.query;
    const sql =
      "UPDATE users_data SET isVerified = TRUE WHERE verificationToken = ?";
    const result = await new Promise((resolve, reject) => {
      db.query(sql, [token], (err, result) => {
        if (err) {
          reject("Verification failed");
        } else {
          resolve(result);
        }
      });
    });

    if (result.affectedRows === 0) {
      return res.status(400).send("Invalid or expired verification token");
    }

    res.send("Email verified successfully!");
  } catch (err) {
    logger.error("Verification error:", err);
    res.status(500).send("Server error during verification");
  }
});

module.exports = emailVerification;
