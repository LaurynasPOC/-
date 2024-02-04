require("dotenv").config(); // This line should be at the top

const express = require("express");
const mysql = require("mysql");

const app = express();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected successfully");
  }
});

app.get("/", (req, res) => {
  res.send("Home page");
});

app.listen(5000, () => {
  console.log("Express server listening on port 5000");
});
