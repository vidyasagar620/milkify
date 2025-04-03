const express = require("express");
const router = express.Router();
const pool = require("../db.js"); // Import DB connection

//  Fetch all collections from the database
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM collections");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching collections:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, description, price, image_url } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and Price are required" });
    }

    const result = await pool.query(
      "INSERT INTO collection (name, description, price, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, description, price, image_url]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(" Error adding product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;
