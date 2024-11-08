// Load db config
const db = require("../database/config.js");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");

// Returns all rows of people in memberships
const getMemberships = async (req, res) => {
  try {
    // Select all rows from the "memberships" table
    const query = "SELECT * FROM Memberships";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.pool.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching people from the database:", error);
    res.status(500).json({ error: "Error fetching memberships" });
  }
};

// Returns a single person by their unique ID from memberships
const getMembershipByID = async (req, res) => {
  try {
    const membershipID = req.params.id;
    const query = "SELECT * FROM Memberships WHERE id = ?";
    const [result] = await db.pool.query(query, [membershipID]);
    // Check if membership was found
    if (result.length === 0) {
      return res.status(404).json({ error: "Membership not found" });
    }
    const membership = result[0];
    res.json(membership);
  } catch (error) {
    console.error("Error fetching membership from the database:", error);
    res.status(500).json({ error: "Error fetching person" });
  }
};

// Returns status of creation of new person in membership
const createMembership = async (req, res) => {
  try {
    const { membershipID, membershipPrice, renewPeriod, gymAccess } = req.body;
    const query =
      "INSERT INTO memberships (membershipID, membershipPrice, renewPeriod, gymAccess) VALUES (?, ?, ?, ?)";

    const response = await db.pool.query(query, [
      membershipID,
      membershipPrice,
      renewPeriod,
      gymAccess,
    ]);
    res.status(201).json(response);
  } catch (error) {
    // Print the error for the dev
    console.error("Error creating person:", error);
    // Inform the client of the error
    res.status(500).json({ error: "Error creating membership" });
  }
};


const updateMembership = async (req, res) => {
  // Get the membership ID
  const membershipID = req.params.id;
  // Get the membership object
  const newMembership = req.body;

  try {
    const [data] = await db.pool.query("SELECT * FROM Memberships WHERE id = ?", [
      membershipID,
    ]);

    const oldMembership = data[0];

    // If any attributes are not equal, perform update
    if (!lodash.isEqual(newMembership, oldMembership)) {
      const query =
        "UPDATE memberships SET membershipID=?, membershipPrice=?, renewPeriod=?, gymAccess=?";

      // Homeoworld is NULL-able FK in people, has to be valid INT FK ID or NULL
      //const hw = newMembership.homeworld === "" ? null : newPerson.homeworld;

      const values = [
        newMembership.membershipID,
        newMembership.membershipPrice,
        newMembership.renewPeriod,
        newMembership.gymAccess,
        membershipID
      ];

      // Perform the update
      await db.pool.query(query, values);
      // Inform client of success and return 
      return res.json({ message: "Membership updated successfully." });
    }

    res.json({ message: "Membership details are the same, no update" });
  } catch (error) {
    console.log("Error updating membership", error);
    res
      .status(500)
      .json({ error: `Error updating the membership with id ${membershipID}` });
  }
};

// Endpoint to delete a customer from the database
const deleteMembership = async (req, res) => {
  console.log("Deleting membership with id:", req.params.id);
  const membershipID = req.params.id;

  try {
    // Ensure the person exitst
    const [isExisting] = await db.pool.query(
      "SELECT 1 FROM Memberships WHERE id = ?",
      [membershipID]
    );

    // If the person doesn't exist, return an error
    if (isExisting.length === 0) {
      return res.status(404).send("Membership not found");
    }
/*
    // Delete related records from the intersection table (see FK contraints cert_memberships)
    const [response] = await db.pool.query(
      "DELETE FROM cert_memberships WHERE pid = ?",
      [membershipID]
    );

    console.log(
      "Deleted",
      response.affectedRows,
      "rows from cert_memberships intersection table"
    );
*/
    // Delete the person from memberships
    await db.pool.query("DELETE FROM Memberships WHERE id = ?", [membershipID]);

    // Return the appropriate status code
    res.status(204).json({ message: "Person deleted successfully" })
  } catch (error) {
    console.error("Error deleting membership from the database:", error);
    res.status(500).json({ error: error.message });
  }
};

// Export the functions as methods of an object
module.exports = {
  getMemberships,
  getMembershipByID,
  createMembership,
  updateMembership,
  deleteMembership
};
