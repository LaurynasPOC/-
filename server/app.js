const express = require("express");
const cors = require("cors");
const db = require("./database");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

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

app.get("/", (req, res) => {
  db.query(`SELECT * FROM users_data`, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.listen(5000, () => {
  console.log("Express server listening on port 5000");
});
