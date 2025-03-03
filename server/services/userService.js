const db = require("../config/database");

// Get data for the logged-in user
const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users_data WHERE id = ?", [id], (err, results) => {
      if (err) reject(err);
      else resolve(results[0]);
    });
  });
};

// Create or update user data for the logged-in user
const createOrUpdateUser = (id, userData) => {
  return new Promise((resolve, reject) => {
    const { username, address, phone, email } = userData;

    const query = `
      INSERT INTO users_data (id, username, address, phone, email)
      VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        username = VALUES(username),
        address = VALUES(address),
        phone = VALUES(phone),
        email = VALUES(email)
    `;

    db.query(query, [id, username, address, phone, email], (err, result) => {
      if (err) reject(err);
      else resolve({ id: id, ...userData });
    });
  });
};

module.exports = {
  getUserById,
  createOrUpdateUser,
};
