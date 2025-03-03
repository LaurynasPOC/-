const jwt = require("jsonwebtoken");
const logger = require("./logger");
const db = require("../config/database");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const requireVerifiedEmail = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "yourSecretKey"
    );
    const id = decoded.id;

    const sql = "SELECT isVerified FROM users_data WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      if (err) return res.status(500).json({ error: "Internal server error" });

      if (!results.length) {
        return res.status(404).json({ error: "User not found" });
      }

      const isVerified = Number(results[0].isVerified);
      if (isVerified !== 1) {
        return res.status(403).json({ error: "Email not verified" });
      }

      req.user = { id };
      next();
    });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  requireVerifiedEmail,
};
