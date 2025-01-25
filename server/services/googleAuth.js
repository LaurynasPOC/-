const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      const token = jwt.sign(
        {
          id: profile.id,
          email: profile.emails[0].value,
          username: profile.displayName,
        },
        process.env.JWT_SECRET || "yourSecretKey",
        { expiresIn: "1h" }
      );
      return done(null, { token, username: profile.displayName });
    }
  )
);
