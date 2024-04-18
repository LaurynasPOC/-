const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByEmail } = require("../database");
const logger = require("../utils/logger");

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
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
  } catch (error) {
    logger.error(`Error during login for user ${email}: ${error.message}`);
    res.status(500).send("Server error");
  }
});

module.exports = loginRouter;
