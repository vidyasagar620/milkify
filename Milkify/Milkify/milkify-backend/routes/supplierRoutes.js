const express = require("express");
const router = express.Router();
const { addSupplier, getSuppliers } = require("../controllers/supplierController"); // Ensure this path is correct

// Add Supplier Route
router.post("/add", addSupplier);

// Get All Suppliers Route
router.get("/all", getSuppliers);

module.exports = router;
