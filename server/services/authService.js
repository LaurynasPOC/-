const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const db = require("../config/database");
const { sendVerificationEmail } = require("./emailService");

// Find user by email
const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users_data WHERE email = ?";
    db.query(sql, [email], (err, results) => {
      if (err) return reject(new Error("Database query failed"));
      resolve(results[0]);
    });
  });
};

// Validate user password
const validatePassword = async (inputPassword, hashedPassword) => {
  const match = await bcrypt.compare(inputPassword, hashedPassword);
  if (!match) {
    throw new Error("Password incorrect");
  }
};

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "yourSecretKey", {
    expiresIn: "1h",
  });
};

// Check if a user already exists
const checkIfUserExists = (email) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users_data WHERE email = ?";
    db.query(sql, [email], (err, results) => {
      if (err) return reject(new Error("Database query failed"));
      resolve(results.length > 0);
    });
  });
};

// Create a new user
const { v4: uuidv4 } = require("uuid");

const createUser = async (username, email, password, password2) => {
  if (password !== password2) {
    throw new Error("Passwords do not match");
  }

  const userExists = await checkIfUserExists(email);
  if (userExists) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = crypto.randomBytes(20).toString("hex");

  const id = uuidv4();

  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO users_data (id, username, email, password, verificationToken, isVerified) VALUES (?, ?, ?, ?, ?, false)";

    db.query(
      sql,
      [id, username, email, hashedPassword, verificationToken],
      async (err, result) => {
        if (err) {
          console.error("Database Insert Error:", err);
          return reject(new Error(`Database error: ${err.message}`));
        }

        try {
          await sendVerificationEmail(email, verificationToken);
          resolve({ message: "User created. Verification email sent." });
        } catch (emailError) {
          reject(new Error("Error sending verification email"));
        }
      }
    );
  });
};

module.exports = {
  findUserByEmail,
  validatePassword,
  generateToken,
  createUser,
};
