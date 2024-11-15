const express = require("express");
const router = express.Router();
const {
  getMemberships,
  getMembershipByID,
  createMembership,
  updateMembership,
  deleteMembership,
} = require("../controllers/MembershipsController");

router.get("/", getMemberships);
router.get("/:id", getMembershipByID);
router.post("/", createMembership);
router.put("/:id", updateMembership);
router.delete("/:id", deleteMembership);

module.exports = router;
