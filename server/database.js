require("dotenv").config();
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const createUser = async (username, email, password, password2) => {
  if (password !== password2) {
    console.log("Passwords do not match");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql =
    "INSERT INTO users_data (username, email, password) VALUES (?, ?, ?)";
  db.query(sql, [username, email, hashedPassword], (err, result) => {
    if (err) throw err;
    console.log("User created: ", result.insertId);
  });
};

const findUserByEmail = (email, callback) => {
  const sql = "SELECT * FROM users_data WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) return callback(err);
    return callback(null, result[0]);
  });
};
module.exports = { db, createUser, findUserByEmail };
