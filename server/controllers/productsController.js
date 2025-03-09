const {
  addProduct,
  getProductsByUser,
  deleteProduct,
} = require("../services/productsService");

const createProduct = async (req, res) => {
  try {
    const userId = req.user.id;
    const product = await addProduct(userId, req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error("🔥 Database Error:", error);
    res
      .status(500)
      .json({ error: "Failed to add product", details: error.message });
  }
};

const getUserProducts = async (req, res) => {
  try {
    const userId = req.user.id;
    const products = await getProductsByUser(userId);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

const removeProduct = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id;
    const result = await deleteProduct(productId, userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};

module.exports = {
  createProduct,
  getUserProducts,
  removeProduct,
};
