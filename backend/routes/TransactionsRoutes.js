const express = require("express");
const router = express.Router();
const {
  getTransactions,
  getTransactionByID,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/TransactionsController");

router.get("/", getTransactions);
router.get("/:id", getTransactionByID);
router.post("/", createTransaction);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

module.exports = router;
