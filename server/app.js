const express = require("express");
const cors = require("cors");
const db = require("./config/database");
const logger = require("./utils/logger");
const bodyParser = require("body-parser");
const middleware = require("./utils/middleware");
const passport = require("passport");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
// Load Routes
const emailRoutes = require("./routes/emailRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
require("./services/googleAuth"); // ✅ Load Google Strategy

// Database Connection
db.connect((err) => {
  if (err) {
    logger.error("Error connecting to database: " + err.message);
    process.exit(1);
  } else {
    logger.info("Connected to database");
  }
});

// CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Update this to match your client URL
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(middleware.requestLogger);

// Initialize Passport
app.use(passport.initialize());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/email", emailRoutes);
app.use("/api", userRoutes);

// Default Route
app.get("/", (req, res) => {
  db.query("SELECT * FROM users_data", (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Error Handling
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

// Start Server
app.listen(5000, () => {
  console.log("Express server listening on port 5000");
});
