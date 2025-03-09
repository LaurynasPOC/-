const db = require("../config/database");

const addProduct = (userId, productData) => {
  return new Promise((resolve, reject) => {
    const {
      title,
      description,
      price,
      category,
      condition,
      isForSale,
      location,
      contactInfo,
    } = productData;

    const sql = `
        INSERT INTO products (user_id, title, description, price, category, \`condition\`, is_for_sale, location, contact_info)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

    db.query(
      sql,
      [
        userId,
        title,
        description,
        price,
        category,
        condition,
        isForSale,
        location,
        contactInfo,
      ],
      (err, result) => {
        if (err) {
          console.error("🔥 SQL Insert Error:", err);
          reject(err);
        } else {
          console.log("✅ Product Inserted Successfully:", result);
          resolve({ id: result.insertId, ...productData });
        }
      }
    );
  });
};

const deleteProduct = (productId, userId) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM products WHERE id = ? AND user_id = ?";
    db.query(sql, [productId, userId], (err, result) => {
      if (err) reject(err);
      else resolve({ message: "Product deleted successfully" });
    });
  });
};

const getProductsByUser = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM products WHERE user_id = ?";
    db.query(sql, [userId], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

module.exports = {
  addProduct,
  deleteProduct,
  getProductsByUser,
};
