const express = require("express");
const cors = require("cors");
const db = require("./config/database");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const app = express();
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();
//routes
const emailRoutes = require("./routes/emailRoutes");
const authRoutes = require("./routes/authRoutes");
require("./services/googleAuth");

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

app.use("/api/auth", authRoutes);
app.use("/api/email", emailRoutes);
app.get("/", (req, res) => {
  db.query(`SELECT * FROM users_data`, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.COOKIE_KEY || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:5173/dashboard"); // Redirect to React app after login
  }
);

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.get("/current_user", (req, res) => {
  res.send(req.user);
});

app.get("/protected-route", requireVerifiedEmail, (req, res) => {
  res.send("Welcome to the protected route!");
});
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(5000, () => {
  console.log("Express server listening on port 5000");
});
