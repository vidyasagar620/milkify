const express = require("express");
const router = express.Router();
const pool = require("../db"); // Import DB connection

// ✅ Fetch all collections from the database
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM collections");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching collections:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
