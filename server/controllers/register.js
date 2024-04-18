const registerRouter = require("express").Router();
const { createUser } = require("../database");
const logger = require("../utils/logger");

registerRouter.post("/", async (req, res) => {
  const { username, email, password, password2 } = req.body;
  try {
    const message = await createUser(username, email, password, password2);
    res.status(201).send(message);
  } catch (error) {
    logger.error("Error in user registration: " + error);
    if (error === "User already exists with this email") {
      res.status(409).json({ error: "User already exist" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

module.exports = registerRouter;
