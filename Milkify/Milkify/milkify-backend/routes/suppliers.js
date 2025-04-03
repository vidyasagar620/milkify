const express = require("express");
const router = express.Router();
const pool = require("../db"); // Assuming you have PostgreSQL connection setup

//Add a New Supplier
router.post("/api/suppliers", async (req, res) => {
  try {
    const { name, contact, address } = req.body;

    if (!name || !contact || !address) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newSupplier = await pool.query(
      "INSERT INTO suppliers (name, contact, address) VALUES ($1, $2, $3) RETURNING *",
      [name, contact, address]
    );

    res.status(201).json(newSupplier.rows[0]);
  } catch (error) {
    console.error("Error adding supplier:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Fetch All Suppliers
router.get("/api/suppliers", async (req, res) => {
  try {
    const suppliers = await pool.query("SELECT * FROM suppliers ORDER BY id ASC");
    res.json(suppliers.rows);
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

