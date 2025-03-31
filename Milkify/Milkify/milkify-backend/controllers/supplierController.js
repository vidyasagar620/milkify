const pool = require("../config/db"); // Ensure database connection is correct

// Add Supplier Controller
const addSupplier = async (req, res) => {
  try {
    const { name, contact, location } = req.body;
    const result = await pool.query(
      "INSERT INTO suppliers (name, contact, location) VALUES ($1, $2, $3) RETURNING *",
      [name, contact, location]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding supplier:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get All Suppliers Controller
const getSuppliers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM suppliers");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { addSupplier, getSuppliers };
