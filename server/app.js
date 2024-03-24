const express = require("express");
const cors = require("cors");
const { db, createUser, findUserByEmail } = require("./database");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

db.connect((err) => {
  if (err) {
    logger.error("Error connecting to database: " + err.message);
    process.exit(1);
  } else {
    logger.info("Connected to database");
  }
});

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.post("/api/register", async (req, res) => {
  const { username, email, password, password2 } = req.body;
  try {
    await createUser(username, email, password, password2);
    res.status(201).send("User created");
  } catch (error) {
    logger.error("Error creating user: " + error.message);
    res.status(500).send("Error creating user");
  }
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  findUserByEmail(email, async (err, user) => {
    if (err) {
      return res.status(500).send("Server error");
    }
    if (!user) {
      return res.status(400).send("User not found");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send("Password incorrect");
    }
    const token = jwt.sign({ userId: user.id }, "yourSecretKey", {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  });
});

app.get("/", (req, res) => {
  db.query(`SELECT * FROM users_data`, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.listen(5000, () => {
  console.log("Express server listening on port 5000");
});
