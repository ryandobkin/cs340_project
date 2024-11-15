const t_name = 'Customers';
const t_id = 'customerID';

// Load db config
const db = require("../database/config.js");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");

// Returns all rows of people in customers
const getCustomers = async (req, res) => {
  try {
    // Select all rows from the "customers" table
    const query = `SELECT * FROM ${t_name}`;
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.pool.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching people from the database:", error);
    res.status(500).json({ error: "Error fetching customers" });
  }
};

// Returns a single person by their unique ID from customers
const getCustomerByID = async (req, res) => {
  try {
    const customerID = req.params.id;
    const query = `SELECT * FROM ${t_name} WHERE ${t_id} = ?`;
    const [result] = await db.pool.query(query, [customerID]);
    // Check if customer was found
    if (result.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    const customer = result[0];
    res.json(customer);
  } catch (error) {
    console.error("Error fetching customer from the database:", error);
    res.status(500).json({ error: "Error fetching person" });
  }
};

// Returns status of creation of new person in customer
const createCustomer = async (req, res) => {
  try {
    const { customerID, membershipID, name, email, gender, mailAddr, billAddr, city, state, areaCode } = req.body;
    const query =
      `INSERT INTO ${t_name} ( customerID, membershipID, name, email, 
      gender, mailAddr, billAddr, city, state, areaCode ) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const response = await db.pool.query(query, [
      customerID,
      membershipID,
      name,
      email,
      gender,
      mailAddr,
      billAddr,
      city,
      state,
      areaCode
    ]);
    res.status(201).json(response);
  } catch (error) {
    // Print the error for the dev
    console.error("Error creating person:", error);
    // Inform the client of the error
    res.status(500).json({ error: "Error creating customer" });
  }
};


const updateCustomer = async (req, res) => {
  // Get the customer ID
  const customerID = req.params.id;
  // Get the customer object
  const newCustomer = req.body;

  try {
    const [data] = await db.pool.query(`SELECT * FROM ${t_name} WHERE ${t_id} = ?`, [
      customerID,
    ]);

    const oldCustomer = data[0];

    // If any attributes are not equal, perform update
    if (!lodash.isEqual(newCustomer, oldCustomer)) {
      const query =
        `UPDATE ${t_name} SET customerID=?, membershipID=?, name=?, email=?, gender=?, mailAddr=?, billAddr=?, city=?, state=?, areaCode=? WHERE ${t_id}=?`;

      // Homeoworld is NULL-able FK in people, has to be valid INT FK ID or NULL
      const mID = newCustomer.membershipID === "" ? null : newCustomer.membershipID;

      const values = [
        newCustomer.customerID,
        mID,
        newCustomer.name,
        newCustomer.email,
        newCustomer.gender,
        newCustomer.mailAddr,
        newCustomer.billAddr,
        newCustomer.city,
        newCustomer.state,
        newCustomer.areaCode,
        customerID
      ];

      // Perform the update
      await db.pool.query(query, values);
      // Inform client of success and return 
      return res.json({ message: "Customer updated successfully." });
    }

    res.json({ message: "Customer details are the same, no update" });
  } catch (error) {
    console.log("Error updating customer", error);
    res
      .status(500)
      .json({ error: `Error updating the customer with id ${customerID}.`,
              sqlMessage: `sqlMessage: ${error.sqlMessage}}` });
  }
};

// Endpoint to delete a customer from the database
const deleteCustomer = async (req, res) => {
  console.log("Deleting customer with id:", req.params.id);
  const customerID = req.params.id;

  try {
    // Ensure the person exitst
    const [isExisting] = await db.pool.query(
      `SELECT 1 FROM ${t_name} WHERE ${t_id} = ?`,
      [customerID]
    );

    // If the person doesn't exist, return an error
    if (isExisting.length === 0) {
      return res.status(404).send("Customer not found");
    }
/*
    // Delete related records from the intersection table (see FK contraints cert_customers)
    const [response] = await db.pool.query(
      "DELETE FROM Cert_customers WHERE pid = ?",
      [customerID]
    );

    console.log(
      "Deleted",
      response.affectedRows,
      "rows from cert_customers intersection table"
    );
*/
    // Delete the person from customers
    await db.pool.query(`DELETE FROM ${t_name} WHERE ${t_id} = ?`, [customerID]);

    // Return the appropriate status code
    res.status(204).json({ message: "Person deleted successfully" })
  } catch (error) {
    console.error("Error deleting customer from the database:", error);
    res.status(500).json({ error: error.message });
  }
};

// Export the functions as methods of an object
module.exports = {
  getCustomers,
  getCustomerByID,
  createCustomer,
  updateCustomer,
  deleteCustomer
};
