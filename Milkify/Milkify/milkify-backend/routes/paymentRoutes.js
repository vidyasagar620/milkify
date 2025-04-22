const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.get("/", paymentController.getPayments);
router.post("/", paymentController.addPayment);
router.put("/:id", paymentController.updatePayment);
router.delete("/:id", paymentController.deletePayment);

// Weekly and Monthly Avg
router.get("/averages", paymentController.getAverages);
router.get("/today-earning", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT COALESCE(SUM(amount), 0) AS total
      FROM payments
      WHERE type = 'income' AND date = CURRENT_DATE
    `);
    res.json({ todayEarning: result.rows[0].total });
  } catch (err) {
    console.error("Error fetching today's earnings:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
