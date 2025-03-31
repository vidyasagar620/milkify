const express = require("express");
const pool = require("../config/db");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all suppliers
router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM suppliers");
  res.json(result.rows);
});

// Create a supplier (Admin Only)
router.post("/", verifyToken, async (req, res) => {
  const { name, contact } = req.body;
  await pool.query("INSERT INTO suppliers (name, contact) VALUES ($1, $2)", [name, contact]);
  res.json({ message: "Supplier added" });
});

module.exports = router;
