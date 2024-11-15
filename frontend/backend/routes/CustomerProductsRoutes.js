const express = require("express");
const router = express.Router();
const {
  getCustomerProducts,
  getCustomerProductByID,
  createCustomerProduct,
  updateCustomerProduct,
  deleteCustomerProduct,
} = require("../controllers/CustomerProductsController");

router.get("/", getCustomerProducts);
router.get("/:id", getCustomerProductByID);
router.post("/", createCustomerProduct);
router.put("/:id", updateCustomerProduct);
router.delete("/:id", deleteCustomerProduct);

module.exports = router;
