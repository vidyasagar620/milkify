// controllers/paymentController.js
const pool = require("../config/db");

exports.getPayments = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM payments ORDER BY date DESC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addPayment = async (req, res) => {
  const { title, amount, type, date } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO payments (title, amount, type, date) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, amount, type, date]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePayment = async (req, res) => {
  const { id } = req.params;
  const { title, amount, type, date } = req.body;
  try {
    const result = await pool.query(
      "UPDATE payments SET title=$1, amount=$2, type=$3, date=$4 WHERE id=$5 RETURNING *",
      [title, amount, type, date, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePayment = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM payments WHERE id = $1", [id]);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAverages = async (req, res) => {
  try {
    const weeklyQuery = `
      SELECT type, ROUND(AVG(amount), 2) AS avg
      FROM payments
      WHERE date >= NOW() - INTERVAL '7 days'
      GROUP BY type
    `;
    const monthlyQuery = `
      SELECT type, ROUND(AVG(amount), 2) AS avg
      FROM payments
      WHERE date >= NOW() - INTERVAL '1 month'
      GROUP BY type
    `;

    const weeklyResult = await pool.query(weeklyQuery);
    const monthlyResult = await pool.query(monthlyQuery);

    const formatResult = (rows) =>
      rows.reduce((acc, row) => {
        acc[row.type] = row.avg;
        return acc;
      }, {});

    res.json({
      weekly: formatResult(weeklyResult.rows),
      monthly: formatResult(monthlyResult.rows),
    });
  } catch (error) {
    console.error("Error getting averages:", error.message);
    res.status(500).json({ error: "Failed to get averages" });
  }
};
