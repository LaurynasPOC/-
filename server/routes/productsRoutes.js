const express = require("express");
const { requireVerifiedEmail, upload } = require("../utils/middleware");
const {
  createProduct,
  getUserProducts,
  removeProduct,
} = require("../controllers/productsController");

const router = express.Router();

router.post(
  "/",
  requireVerifiedEmail,
  upload.array("images", 5),
  createProduct
);
router.get("/", requireVerifiedEmail, getUserProducts);
router.delete("/:id", requireVerifiedEmail, removeProduct);

module.exports = router;
