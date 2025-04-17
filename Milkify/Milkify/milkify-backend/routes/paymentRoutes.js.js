const express = require("express");
const router = express.Router();
const { addPayment, getPayments } = require("../controllers/paymentController");

// POST a new payment
router.post("/payments", addPayment);

// GET all payments
router.get("/payments", getPayments);

module.exports = router;
