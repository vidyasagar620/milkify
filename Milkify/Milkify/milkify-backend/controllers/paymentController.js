const pool = require("../config/db");

// Add Payment Controller
const addPayment = async (req, res) => {
  try {
    const { amount, date, time, type, description } = req.body;
    const result = await pool.query(
      `INSERT INTO payments (amount, date, time, type, description) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [amount, date, time, type, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding payment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get All Payments Controller
const getPayments = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM payments ORDER BY date DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { addPayment, getPayments };
