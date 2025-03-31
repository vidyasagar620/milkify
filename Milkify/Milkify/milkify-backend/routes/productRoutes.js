const express = require("express");
const pool = require("../config/db");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM products");
  res.json(result.rows);
});

// Create a product (Admin Only)
router.post("/", verifyToken, async (req, res) => {
  const { name, price, image } = req.body;
  await pool.query("INSERT INTO products (name, price, image) VALUES ($1, $2, $3)", [name, price, image]);
  res.json({ message: "Product added" });
});

module.exports = router;
