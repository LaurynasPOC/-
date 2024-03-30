require("dotenv").config();
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const findUserByEmail = (email, callback) => {
  const sql = "SELECT * FROM users_data WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) return callback(err);
    return callback(null, result[0]);
  });
};
const createUser = async (username, email, password, password2) => {
  return new Promise(async (resolve, reject) => {
    if (password !== password2) {
      return reject("Passwords do not match");
    }

    // Check if user already exists
    findUserByEmail(email, async (err, user) => {
      if (err) {
        console.log("Error finding user:", err);
        return reject("Error checking user existence");
      }
      if (user) {
        console.log("User already exists with this email");
        return reject("User already exists with this email");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const sql =
        "INSERT INTO users_data (username, email, password) VALUES (?, ?, ?)";

      db.query(sql, [username, email, hashedPassword], (err, result) => {
        if (err) {
          console.log("Error creating user:", err);
          return reject("Error creating user");
        }
        console.log("User created:", result.insertId);
        resolve("User created");
      });
    });
  });
};
module.exports = { db, createUser, findUserByEmail };
