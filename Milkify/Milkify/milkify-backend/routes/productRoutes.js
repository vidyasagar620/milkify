const express = require("express");
const pool = require("../config/db");

const router = express.Router();

// ✅ Get all products
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Add a new product
router.post("/", async (req, res) => {
  try {
    const { name, description, price, image_url } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and Price are required" });
    }

    const result = await pool.query(
      "INSERT INTO products (name, description, price, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, description, price, image_url]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error adding product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Update an existing product
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, image_url } = req.body;

    const result = await pool.query(
      "UPDATE products SET name = $1, description = $2, price = $3, image_url = $4 WHERE id = $5 RETURNING *",
      [name, description, price, image_url, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error updating product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Delete a product
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
