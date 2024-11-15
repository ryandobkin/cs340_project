const t_name = 'TransactionDetails';
const t_id = 'transactDetailsID';

// Load db config
const db = require("../database/config.js");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");

// Returns all rows of people in transactDetails
const getTransactionDetails = async (req, res) => {
  try {
    // Select all rows from the "transactDetails" table
    const query = `SELECT * FROM ${t_name}`;
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.pool.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching people from the database:", error);
    res.status(500).json({ error: "Error fetching transactDetails" });
  }
};

// Returns a single person by their unique ID from transactDetails
const getTransactionDetailByID = async (req, res) => {
  try {
    const transactDetailsID = req.params.id;
    const query = `SELECT * FROM ${t_name} WHERE ${t_id} = ?`;
    const [result] = await db.pool.query(query, [transactDetailsID]);
    // Check if transactDetails was found
    if (result.length === 0) {
      return res.status(404).json({ error: "TransactionDetails not found" });
    }
    const transactDetails = result[0];
    res.json(transactDetails);
  } catch (error) {
    console.error("Error fetching transactDetails from the database:", error);
    res.status(500).json({ error: "Error fetching person" });
  }
};

// Returns status of creation of new person in transactDetails
const createTransactionDetail = async (req, res) => {
  try {
    const { transactDetailsID, transactID, productID, membershipID, unitPrice, orderQty, orderTotal } = req.body;
    const query =
      `INSERT INTO ${t_name} ( transactDetailsID, transactID, productID, membershipID, unitPrice, orderQty, orderTotal ) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const response = await db.pool.query(query, [
      transactDetailsID,
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
    res.status(500).json({ error: "Error creating transactDetails" });
  }
};


const updateTransactionDetail = async (req, res) => {
  // Get the transactDetails ID
  const transactDetailsID = req.params.id;
  // Get the transactDetails object
  const newTransactDetails = req.body;

  try {
    const [data] = await db.pool.query(`SELECT * FROM ${t_name} WHERE ${t_id} = ?`, [
      transactDetailsID,
    ]);

    const oldTransactDetails = data[0];

    // If any attributes are not equal, perform update
    if (!lodash.isEqual(newTransactDetails, oldTransactDetails)) {
      const query =
        `UPDATE ${t_name} SET transactDetailsID=?, transactID=?, productID=?, membershipID=?, unitPrice=?, orderQty=?, orderTotal=? WHERE ${t_id} = ?`;

      // Homeoworld is NULL-able FK in people, has to be valid INT FK ID or NULL
      const tID = newTransactDetails.transactID === "" ? null : newTransactDetails.transactID;
      const pID = newTransactDetails.productID === "" ? null : newTransactDetails.productID;
      const mID = newTransactDetails.membershipID === "" ? null : newTransactDetails.membershipID;

      const values = [
        newTransactDetails.transactDetailsID,
        tID,
        pID,
        mID,
        newTransactDetails.unitPrice,
        newTransactDetails.orderQty,
        newTransactDetails.orderTotal,
        transactDetailsID
      ];

      // Perform the update
      await db.pool.query(query, values);
      // Inform client of succes and return 
      return res.json({ mesage: "TransactDetails updated succesfully." });
    }

    res.json({ mesage: "TransactDetails details are the same, no update" });
  } catch (error) {
    console.log("Error updating transactDetails", error);
    res
      .status(500)
      .json({ error: `Error updating the transactDetails with id ${transactDetailsID}` });
  }
};

// Endpoint to delete a customer from the database
const deleteTransactionDetail = async (req, res) => {
  console.log("Deleting transactDetails with id:", req.params.id);
  const transactDetailsID = req.params.id;

  try {
    // Ensure the person exitst
    const [isExisting] = await db.pool.query(
      `SELECT 1 FROM ${t_name} WHERE ${t_id} = ?`,
      [transactDetailsID]
    );

    // If the person doesn't exist, return an error
    if (isExisting.length === 0) {
      return res.status(404).send("TransactDetails not found");
    }
/*
    // Delete related records from the intersection table (see FK contraints cert_transactDetails)
    const [response] = await db.pool.query(
      "DELETE FROM cert_transactDetails WHERE pid = ?",
      [transactDetailsID]
    );

    console.log(
      "Deleted",
      response.affectedRows,
      "rows from cert_transactDetails intersection table"
    );
*/
    // Delete the person from transactDetails
    await db.pool.query(`DELETE FROM ${t_name} WHERE ${t_id} = ?`, [transactDetailsID]);

    // Return the appropriate status code
    res.status(204).json({ mesage: "Person deleted succesfully" })
  } catch (error) {
    console.error("Error deleting transactDetails from the database:", error);
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
