const t_name = 'Transactions';
const t_id = 'transactID';

// Load db config
const db = require("../database/config.js");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");

// Returns all rows of people in transactions
const getTransactions = async (req, res) => {
  try {
    // Select all rows from the "transactions" table
    const query = `SELECT * FROM ${t_name}`;
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.pool.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching people from the database:", error);
    res.status(500).json({ error: "Error fetching transactions" });
  }
};

// Returns a single person by their unique ID from transactions
const getTransactionByID = async (req, res) => {
  try {
    const transactID = req.params.id;
    const query = `SELECT * FROM ${t_name} WHERE ${t_id} = ?`;
    const [result] = await db.pool.query(query, [transactID]);
    // Check if transaction was found
    if (result.length === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    const transaction = result[0];
    res.json(transaction);
  } catch (error) {
    console.error("Error fetching transaction from the database:", error);
    res.status(500).json({ error: "Error fetching person" });
  }
};

// Returns status of creation of new person in transaction
const createTransaction = async (req, res) => {
  try {
    const { transactID, customerID, transactDate, transactTotal } = req.body;
    const query =
      `INSERT INTO ${t_name} (transactID, customerID, transactDate, transactTotal) VALUES (?, ?, ?, ?)`;

    const response = await db.pool.query(query, [
      transactID,
      customerID,
      transactDate,
      transactTotal,
    ]);
    res.status(201).json(response);
  } catch (error) {
    // Print the error for the dev
    console.error("Error creating person:", error);
    // Inform the client of the error
    res.status(500).json({ error: "Error creating transaction" });
  }
};


const updateTransaction = async (req, res) => {
  // Get the transaction ID
  const transactID = req.params.id;
  // Get the transaction object
  const newTransaction = req.body;

  try {
    const [data] = await db.pool.query(`SELECT * FROM ${t_name} WHERE ${t_id} = ?`, [
      transactID,
    ]);

    const oldTransaction = data[0];

    // If any attributes are not equal, perform update
    if (!lodash.isEqual(newTransaction, oldTransaction)) {
      const query =
       `UPDATE ${t_name} SET transactID=?, customerID=?, transactDate=?, transactTotal=? WHERE ${t_id} = ?`;

      // Homeoworld is NULL-able FK in people, has to be valid INT FK ID or NULL
      const cID = newTransaction.customerID === "" ? null : newTransaction.customerID;

      const values = [
        newTransaction.transactID,
        cID,
        newTransaction.transactDate,
        newTransaction.transactTotal,
        transactID
      ];

      // Perform the update
      await db.pool.query(query, values);
      // Inform client of success and return 
      return res.json({ message: "Transaction updated successfully." });
    }

    res.json({ message: "Transaction details are the same, no update" });
  } catch (error) {
    console.log("Error updating transaction", error);
    res
      .status(500)
      .json({ error: `Error updating the transaction with id ${transactID}` });
  }
};

// Endpoint to delete a customer from the database
const deleteTransaction = async (req, res) => {
  console.log("Deleting transaction with id:", req.params.id);
  const transactID = req.params.id;

  try {
    // Ensure the person exitst
    const [isExisting] = await db.pool.query(
      `SELECT 1 FROM ${t_name} WHERE ${t_id} = ?`,
      [transactID]
    );

    // If the person doesn't exist, return an error
    if (isExisting.length === 0) {
      return res.status(404).send("Transaction not found");
    }
/*
    // Delete related records from the intersection table (see FK contraints cert_transactions)
    const [response] = await db.pool.query(
      "DELETE FROM cert_transactions WHERE pid = ?",
      [transactID]
    );

    console.log(
      "Deleted",
      response.affectedRows,
      "rows from cert_transactions intersection table"
    );
*/
    // Delete the person from transactions
    await db.pool.query(`DELETE FROM ${t_name} WHERE ${t_id} = ?`, [transactID]);

    // Return the appropriate status code
    res.status(204).json({ message: "Person deleted successfully" })
  } catch (error) {
    console.error("Error deleting transaction from the database:", error);
    res.status(500).json({ error: error.message });
  }
};

// Export the functions as methods of an object
module.exports = {
  getTransactions,
  getTransactionByID,
  createTransaction,
  updateTransaction,
  deleteTransaction
};
