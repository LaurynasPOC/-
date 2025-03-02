const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const db = require("../config/database"); // Assuming this is your DB connection

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const id = profile.id;
        const email = profile.emails[0].value;
        const username = profile.displayName;

        // 🔍 Check if user already exists
        const checkUserQuery = "SELECT * FROM users_data WHERE email = ?";
        db.query(checkUserQuery, [email], (err, results) => {
          if (err) {
            console.error("Database error during user check:", err);
            return done(err, null);
          }

          if (results.length === 0) {
            // 📝 Insert new user if not found
            const insertQuery = `
              INSERT INTO users_data (id, email, username, isVerified)
              VALUES (?, ?, ?, 1)
            `;
            db.query(insertQuery, [id, email, username], (err) => {
              if (err) {
                console.error("Database error during user insert:", err);
                return done(err, null);
              }

              console.log("✅ New user inserted:", email);
              const token = generateToken(id, email, username);
              return done(null, { token, username });
            });
          } else {
            // 🔄 Update existing user info if needed
            const updateQuery = `
              UPDATE users_data 
              SET username = ?, isVerified = 1 
              WHERE email = ?
            `;
            db.query(updateQuery, [username, email], (err) => {
              if (err) {
                console.error("Database error during user update:", err);
                return done(err, null);
              }

              console.log("✅ Existing user updated:", email);
              const token = generateToken(id, email, username);
              return done(null, { token, username });
            });
          }
        });
      } catch (error) {
        console.error("🔥 Error in Google Auth callback:", error);
        return done(error, null);
      }
    }
  )
);

// 🎟️ Helper function to generate JWT
const generateToken = (id, email, username) => {
  return jwt.sign(
    { id, email, username },
    process.env.JWT_SECRET || "yourSecretKey",
    { expiresIn: "1h" }
  );
};
