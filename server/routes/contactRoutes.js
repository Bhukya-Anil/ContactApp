// server/routes/contactRoutes.js
const express = require("express");
const {
  addContact,
  getContacts,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const router = express.Router();

// Routes for CRUD operations
router.post("/", addContact); // Create
router.get("/", getContacts); // Read all
router.put("/:id", updateContact); // Update
router.delete("/:id", deleteContact); // Delete

module.exports = router;
