const express = require("express");
const router = express.Router();
const {
  getTransactionDetails,
  getTransactionDetailByID,
  createTransactionDetail,
  updateTransactionDetail,
  deleteTransactionDetail,
} = require("../controllers/TransactionDetailsController");

router.get("/", getTransactionDetails);
router.get("/:id", getTransactionDetailByID);
router.post("/", createTransactionDetail);
router.put("/:id", updateTransactionDetail);
router.delete("/:id", deleteTransactionDetail);

module.exports = router;
