const t_name = 'CustomerProducts';
const t_id = 'customerProductID';


// Load db config
const db = require("../database/config.js");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");

// Returns all rows of people in customerProducts
const getCustomerProducts = async (req, res) => {
  try {
    // Select all rows from the "customerProducts" table
    const query = `SELECT * FROM ${t_name}`;
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.pool.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching people from the database:", error);
    res.status(500).json({ error: "Error fetching customerProducts" });
  }
};

// Returns a single person by their unique ID from customerProducts
const getCustomerProductByID = async (req, res) => {
  try {
    const customerProductID = req.params.id;
    const query = `SELECT * FROM ${t_name} WHERE ${t_id} = ?`;
    const [result] = await db.pool.query(query, [customerProductID]);
    // Check if customerProduct was found
    if (result.length === 0) {
      return res.status(404).json({ error: "CustomerProduct not found" });
    }
    const customerProduct = result[0];
    res.json(customerProduct);
  } catch (error) {
    console.error("Error fetching customerProduct from the database:", error);
    res.status(500).json({ error: "Error fetching customer" });
  }
};

// Returns status of creation of new person in customerProduct
const createCustomerProduct = async (req, res) => {
  try {
    const { customerProductID, quantity, productID, membershipID, customerID } = req.body;
    const query =
      `INSERT INTO ${t_name} ( customerProductID, customerID, productID, membershipID, quantity) 
      VALUES (?, ?, ?, ?, ?)`;

    const response = await db.pool.query(query, [
      customerProductID,
      customerID,
      productID,
      membershipID,
      quantity,
    ]);
    res.status(201).json(response);
  } catch (error) {
    // Print the error for the dev
    console.error("Error creating person:", error);
    // Inform the client of the error
    res.status(500).json({ error: "Error creating customerProduct" });
  }
};


const updateCustomerProduct = async (req, res) => {
  // Get the customerProduct ID
  const customerProductID = req.params.id;
  console.log("customerProductID", customerProductID);
  // Get the customerProduct object
  const newCustomerProduct = req.body;

  try {
    const [data] = await db.pool.query(`SELECT * FROM ${t_name} WHERE ${t_id} = ?`, [
      customerProductID,
    ]);

    const oldCustomerProduct = data[0];

    // If any attributes are not equal, perform update
    if (!lodash.isEqual(newCustomerProduct, oldCustomerProduct)) {
      const query =
        `UPDATE ${t_name} SET customerProductID=?, quantity=?, productID=?, membershipID=?, customerID=? WHERE ${t_id}=?`;

      // Homeoworld is NULL-able FK in people, has to be valid INT FK ID or NULL
      const pID = newCustomerProduct.productID === "" ? null : newCustomerProduct.productID;
      const mID = newCustomerProduct.membershipID === "" ? null : newCustomerProduct.membershipID;
      const cID = newCustomerProduct.customerID === "" ? null : newCustomerProduct.customerID;

      const values = [
        newCustomerProduct.customerProductID,
        newCustomerProduct.quantity,
        pID,
        mID,
        cID,
        customerProductID
      ]

      // Perform the update
      await db.pool.query(query, values);
      // Inform client of success and return 
      return res.json({ message: "CustomerProduct updated successfully." });
    }

    res.json({ message: "CustomerProduct details are the same, no update" });
  } catch (error) {
    console.log("Error updating customerProduct", error);
    res
      .status(500)
      .json({ error: `Error updating the customerProduct with id ${customerProductID}` });
  }
};

// Endpoint to delete a customer from the database
const deleteCustomerProduct = async (req, res) => {
  console.log("Deleting customerProduct with id:", req.params.id);
  const customerProductID = req.params.id;

  try {
    // Ensure the person exitst
    const [isExisting] = await db.pool.query(
      `SELECT 1 FROM ${t_name} WHERE ${t_id} = ?`,
      [customerProductID]
    );

    // If the person doesn't exist, return an error
    if (isExisting.length === 0) {
      return res.status(404).send("CustomerProduct not found");
    }
/*
    // Delete related records from the intersection table (see FK contraints cert_customerProducts)
    const [response] = await db.pool.query(
      "DELETE FROM cert_customerProducts WHERE pid = ?",
      [customerProductID]
    );

    console.log(
      "Deleted",
      response.affectedRows,
      "rows from cert_customerProducts intersection table"
    );
*/
    // Delete the person from customerProducts
    await db.pool.query(`DELETE FROM ${t_name} WHERE ${t_id} = ?`, [customerProductID]);

    // Return the appropriate status code
    res.status(204).json({ message: "Person deleted successfully" })
  } catch (error) {
    console.error("Error deleting customerProduct from the database:", error);
    res.status(500).json({ error: error.message });
  }
};

// Export the functions as methods of an object
module.exports = {
  getCustomerProducts,
  getCustomerProductByID,
  createCustomerProduct,
  updateCustomerProduct,
  deleteCustomerProduct
};
