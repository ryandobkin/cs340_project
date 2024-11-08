// Load db config
const db = require("../database/config.js");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");

// Returns all rows of people in transactionDetails
const getTransactionDetails = async (req, res) => {
  try {
    // Select all rows from the "transactionDetails" table
    const query = "SELECT * FROM TransactionDetails";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.pool.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching people from the database:", error);
    res.status(500).json({ error: "Error fetching transactionDetails" });
  }
};

// Returns a single person by their unique ID from transactionDetails
const getTransactionDetailByID = async (req, res) => {
  try {
    const transactionDetailsID = req.params.id;
    const query = "SELECT * FROM TransactionDetails WHERE id = ?";
    const [result] = await db.pool.query(query, [transactionDetailsID]);
    // Check if transactionDetails was found
    if (result.length === 0) {
      return res.status(404).json({ error: "TransactionDetails not found" });
    }
    const transactionDetails = result[0];
    res.json(transactionDetails);
  } catch (error) {
    console.error("Error fetching transactionDetails from the database:", error);
    res.status(500).json({ error: "Error fetching person" });
  }
};

// Returns status of creation of new person in transactionDetails
const createTransactionDetail = async (req, res) => {
  try {
    const { transactionDetailsID, transactID, productID, membershipID, unitPrice, orderQty, orderTotal } = req.body;
    const query =
      "INSERT INTO transactionDetails (transactionDetailsID, transactID, productID, membershipID, unitPrice, orderQty, orderTotal) VALUES (?, ?, ?, ?, ?, ?, ?)";

    const response = await db.pool.query(query, [
      transactionDetailsID,
      transactID,
      productID,
      membershipID,
      unitPrice,
      orderQty,
      orderTotal
    ]);
    res.status(201).json(response);
  } catch (error) {
    // Print the error for the dev
    console.error("Error creating person:", error);
    // Inform the client of the error
    res.status(500).json({ error: "Error creating transactionDetails" });
  }
};


const updateTransactionDetail = async (req, res) => {
  // Get the transactionDetails ID
  const transactionDetailsID = req.params.id;
  // Get the transactionDetails object
  const newTransactionDetails = req.body;

  try {
    const [data] = await db.pool.query("SELECT * FROM TransactionDetails WHERE id = ?", [
      transactionDetailsID,
    ]);

    const oldTransactionDetails = data[0];

    // If any attributes are not equal, perform update
    if (!lodash.isEqual(newTransactionDetails, oldTransactionDetails)) {
      const query =
        "UPDATE transactionDetails SET transactionDetailsID=?, transactID=?, productID=?, membershipID=?, unitPrice=?, orderQty=?, orderTotal=?";

      // Homeoworld is NULL-able FK in people, has to be valid INT FK ID or NULL
      const tID = newTransactionDetails.transactID === "" ? null : newTransactionDetails.transactID;
      const pID = newTransactionDetails.productID === "" ? null : newTransactionDetails.productID;
      const mID = newTransactionDetails.membershipID === "" ? null : newTransactionDetails.membershipID;

      const values = [
        newTransactionDetails.transactionDetailsID,
        newTransactionDetails.transactID,
        newTransactionDetails.productID,
        newTransactionDetails.membershipID,
        newTransactionDetails.unitPrice,
        newTransactionDetails.orderQty,
        newTransactionDetails.orderTotal,
        tID,
        pID,
        mID,
        transactionDetailsID
      ];

      // Perform the update
      await db.pool.query(query, values);
      // Inform client of succes and return 
      return res.json({ mesage: "TransactionDetails updated succesfully." });
    }

    res.json({ mesage: "TransactionDetails details are the same, no update" });
  } catch (error) {
    console.log("Error updating transactionDetails", error);
    res
      .status(500)
      .json({ error: `Error updating the transactionDetails with id ${transactionDetailsID}` });
  }
};

// Endpoint to delete a customer from the database
const deleteTransactionDetail = async (req, res) => {
  console.log("Deleting transactionDetails with id:", req.params.id);
  const transactionDetailsID = req.params.id;

  try {
    // Ensure the person exitst
    const [isExisting] = await db.pool.query(
      "SELECT 1 FROM TransactionDetails WHERE id = ?",
      [transactionDetailsID]
    );

    // If the person doesn't exist, return an error
    if (isExisting.length === 0) {
      return res.status(404).send("TransactionDetails not found");
    }
/*
    // Delete related records from the intersection table (see FK contraints cert_transactionDetails)
    const [response] = await db.pool.query(
      "DELETE FROM cert_transactionDetails WHERE pid = ?",
      [transactionDetailsID]
    );

    console.log(
      "Deleted",
      response.affectedRows,
      "rows from cert_transactionDetails intersection table"
    );
*/
    // Delete the person from transactionDetails
    await db.pool.query("DELETE FROM TransactionDetails WHERE id = ?", [transactionDetailsID]);

    // Return the appropriate status code
    res.status(204).json({ mesage: "Person deleted succesfully" })
  } catch (error) {
    console.error("Error deleting transactionDetails from the database:", error);
    res.status(500).json({ error: error.mesage });
  }
};

// Export the functions as methods of an object
module.exports = {
  getTransactionDetails,
  getTransactionDetailByID,
  createTransactionDetail,
  updateTransactionDetail,
  deleteTransactionDetail
};
