const express = require("express");
const router = express.Router();
const { addProduct, getProducts } = require("../controllers/productController"); // Ensure this path is correct

// Add Product Route
router.post("/add", addProduct);

// Get All Products Route
router.get("/all", getProducts);

module.exports = router;
