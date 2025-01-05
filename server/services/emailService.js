const db = require("../config/database");
const logger = require("../utils/logger");

const verifyEmailToken = (token) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users_data WHERE verificationToken = ?";
    db.query(sql, [token], (err, results) => {
      if (err) {
        logger.error("Database error:", err);
        return reject(new Error("Internal server error"));
      }

      if (!results.length) {
        return reject(new Error("Invalid or expired token"));
      }

      resolve(results[0]);
    });
  });
};

const updateVerificationStatus = (token) => {
  return new Promise((resolve, reject) => {
    const sql =
      "UPDATE users_data SET isVerified = true, verificationToken = NULL WHERE verificationToken = ?";
    db.query(sql, [token], (err, result) => {
      if (err) {
        logger.error("Error updating verification status:", err);
        return reject(new Error("Internal server error"));
      }

      if (result.affectedRows === 0) {
        return reject(new Error("Verification token not found"));
      }

      resolve();
    });
  });
};

module.exports = { verifyEmailToken, updateVerificationStatus };
