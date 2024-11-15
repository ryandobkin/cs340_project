const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/ProductsController");

router.get("/", getProducts);
router.get("/:id", getProductByID);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
