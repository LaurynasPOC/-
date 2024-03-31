const express = require("express");
const cors = require("cors");
const { db, findUserByEmail } = require("./database");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const registerRouter = require("./controllers/register");

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

app.use("/api/register", registerRouter);

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
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(5000, () => {
  console.log("Express server listening on port 5000");
});
