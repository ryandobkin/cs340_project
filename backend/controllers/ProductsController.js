// Load db config
const db = require("../database/config.js");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");

// Returns all rows of people in products
const getProducts = async (req, res) => {
  try {
    // Select all rows from the "products" table
    const query = "SELECT * FROM Products";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.pool.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching people from the database:", error);
    res.status(500).json({ error: "Error fetching products" });
  }
};

// Returns a single person by their unique ID from products
const getProductByID = async (req, res) => {
  try {
    const productID = req.params.id;
    const query = "SELECT * FROM Products WHERE id = ?";
    const [result] = await db.pool.query(query, [productID]);
    // Check if product was found
    if (result.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    const product = result[0];
    res.json(product);
  } catch (error) {
    console.error("Error fetching product from the database:", error);
    res.status(500).json({ error: "Error fetching person" });
  }
};

// Returns status of creation of new person in product
const createProduct = async (req, res) => {
  try {
    const { productID, productName, productPrice, productCost } = req.body;
    const query =
      "INSERT INTO products (productID, productName, productPrice, productCost) VALUES (?, ?, ?, ?)";

    const response = await db.pool.query(query, [
      productID,
      productName,
      productPrice,
      productCost,
    ]);
    res.status(201).json(response);
  } catch (error) {
    // Print the error for the dev
    console.error("Error creating person:", error);
    // Inform the client of the error
    res.status(500).json({ error: "Error creating product" });
  }
};


const updateProduct = async (req, res) => {
  // Get the product ID
  const productID = req.params.id;
  // Get the product object
  const newProduct = req.body;

  try {
    const [data] = await db.pool.query("SELECT * FROM Products WHERE id = ?", [
      productID,
    ]);

    const oldProduct = data[0];

    // If any attributes are not equal, perform update
    if (!lodash.isEqual(newProduct, oldProduct)) {
      const query =
        "UPDATE products SET productID=?, productName=?, productPrice=?, productCost=?";

      // Homeoworld is NULL-able FK in people, has to be valid INT FK ID or NULL
      //const hw = newProduct.homeworld === "" ? null : newPerson.homeworld;

      const values = [
        newProduct.productID,
        newProduct.productName,
        newProduct.productPrice,
        newProduct.productCost,
        productID
      ];

      // Perform the update
      await db.pool.query(query, values);
      // Inform client of success and return 
      return res.json({ message: "Product updated successfully." });
    }

    res.json({ message: "Product details are the same, no update" });
  } catch (error) {
    console.log("Error updating product", error);
    res
      .status(500)
      .json({ error: `Error updating the product with id ${productID}` });
  }
};

// Endpoint to delete a customer from the database
const deleteProduct = async (req, res) => {
  console.log("Deleting product with id:", req.params.id);
  const productID = req.params.id;

  try {
    // Ensure the person exitst
    const [isExisting] = await db.pool.query(
      "SELECT 1 FROM Products WHERE id = ?",
      [productID]
    );

    // If the person doesn't exist, return an error
    if (isExisting.length === 0) {
      return res.status(404).send("Product not found");
    }
/*
    // Delete related records from the intersection table (see FK contraints cert_products)
    const [response] = await db.pool.query(
      "DELETE FROM cert_products WHERE pid = ?",
      [productID]
    );

    console.log(
      "Deleted",
      response.affectedRows,
      "rows from cert_products intersection table"
    );
*/
    // Delete the person from products
    await db.pool.query("DELETE FROM Products WHERE id = ?", [productID]);

    // Return the appropriate status code
    res.status(204).json({ message: "Person deleted successfully" })
  } catch (error) {
    console.error("Error deleting product from the database:", error);
    res.status(500).json({ error: error.message });
  }
};

// Export the functions as methods of an object
module.exports = {
  getProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct
};
