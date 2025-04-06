const express = require("express");
const router = express.Router();
const pool = require("../config/db"); // PostgreSQL database connection

//Add a new supplier
router.post("/", async (req, res) => {
    const { name, contact, address } = req.body;
    if (!name || !contact || !address) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const result = await pool.query(
            "INSERT INTO suppliers (name, contact, address) VALUES ($1, $2, $3) RETURNING *",
            [name, contact, address]
        );
        res.status(201).json(result.rows[0]); // Return the newly created supplier
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Database error" });
    }
});

//  Get all suppliers
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM suppliers");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Database error" });
    }
});

//Delete a supplier
router.delete("/:id", async (req, res) => {
    try {
        const result = await pool.query("DELETE FROM suppliers WHERE id = $1 RETURNING *", [req.params.id]);
        if (result.rowCount === 0) return res.status(404).json({ message: "Supplier not found" });
        res.json({ message: "Supplier deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Database error" });
    }
});

module.exports = router;
