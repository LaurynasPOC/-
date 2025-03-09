const express = require("express");
const path = require("path");
const cors = require("cors");
const db = require("./config/database");
const logger = require("./utils/logger");
const bodyParser = require("body-parser");
const middleware = require("./utils/middleware");
const passport = require("passport");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const emailRoutes = require("./routes/emailRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productsRoutes");
require("./services/googleAuth");

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
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// Error Handling
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

// Start Server
app.listen(5000, () => {
  console.log("Express server listening on port 5000");
});
