const express = require("express");
const cors = require("cors");
const { db } = require("./database");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const app = express();
const registerRouter = require("./controllers/register");
const loginRouter = require("./controllers/login");
const verifyRouter = require("./controllers/verifyRouter");

const { requireVerifiedEmail } = require("./utils/middleware");

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
app.use("/api/login", loginRouter);
app.use("/api", verifyRouter);

app.get("/", (req, res) => {
  db.query(`SELECT * FROM users_data`, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get("/protected-route", requireVerifiedEmail, (req, res) => {
  res.send("Welcome to the protected route!");
});
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(5000, () => {
  console.log("Express server listening on port 5000");
});
