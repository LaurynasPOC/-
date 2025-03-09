const express = require("express");
const { requireVerifiedEmail } = require("../utils/middleware");
const {
  createProduct,
  getUserProducts,
  removeProduct,
} = require("../controllers/productsController");

const router = express.Router();

router.post("/products", requireVerifiedEmail, createProduct);
router.get("/products", requireVerifiedEmail, getUserProducts);
router.delete("products/:id", requireVerifiedEmail, removeProduct);

module.exports = router;
