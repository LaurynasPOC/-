require("dotenv").config();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const logger = require("./utils/logger");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // Prevent TLS errors, useful for development
  },
});

const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users_data WHERE email = ?";
    db.query(sql, [email], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
};

const createUser = async (username, email, password, password2) => {
  if (password !== password2) {
    throw new Error("Passwords do not match");
  }

  const user = await findUserByEmail(email);
  if (user) {
    throw new Error("User already exists with this email");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = crypto.randomBytes(20).toString("hex");
  const sql =
    "INSERT INTO users_data (username, email, password, verificationToken, isVerified) VALUES (?, ?, ?, ?, false)";

  try {
    const result = await new Promise((resolve, reject) => {
      db.query(
        sql,
        [username, email, hashedPassword, verificationToken],
        (err, result) => {
          if (err) {
            reject("Error creating user");
          } else {
            resolve(result);
          }
        }
      );
    });

    const verificationLink = `http://localhost:5000/api/email/verify-email?token=${verificationToken}`;

    const mailOptions = {
      from: "YourApp",
      to: email,
      subject: "Verify Your Email",
      text: `Please verify your email by clicking the following link: ${verificationLink}`,
    };

    await transporter.sendMail(mailOptions);
    logger.info("Verification email sent to:", email);

    return {
      id: result.insertId,
      message: "User created. Verification email sent.",
    };
  } catch (err) {
    logger.error("Error in createUser:", err);
    throw err;
  }
};

module.exports = { db, createUser, findUserByEmail };
