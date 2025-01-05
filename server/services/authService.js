const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/database");

const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users_data WHERE email = ?";
    db.query(sql, [email], (err, results) => {
      if (err) return reject(new Error("Database query failed"));
      resolve(results[0]);
    });
  });
};

const validatePassword = async (inputPassword, hashedPassword) => {
  const match = await bcrypt.compare(inputPassword, hashedPassword);
  if (!match) {
    throw new Error("Password incorrect");
  }
};

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || "yourSecretKey", {
    expiresIn: "1h",
  });
};

module.exports = { findUserByEmail, validatePassword, generateToken };
