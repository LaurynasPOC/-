const express = require("express");
const logger = require("../utils/logger");
const { db } = require("../database");

const verifyRouter = express.Router();

verifyRouter.get("/verify-email", (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: "Invalid or missing token" });
  }

  const sql = "SELECT * FROM users_data WHERE verificationToken = ?";
  db.query(sql, [token], (err, results) => {
    if (err) {
      logger.error("Database error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (!results.length) {
      return res.status(400).json({ error: "Invalid token" });
    }

    const updateSql =
      "UPDATE users_data SET isVerified = true, verificationToken = NULL WHERE verificationToken = ?";
    db.query(updateSql, [token], (updateErr) => {
      if (updateErr) {
        logger.error("Error updating user verification status:", updateErr);
        return res.status(500).json({ error: "Internal server error" });
      }

      logger.info("Email verified successfully for user:", results[0].email);
      res.status(200).json({ message: "Email verified successfully!" });
    });
  });
});

module.exports = verifyRouter;
