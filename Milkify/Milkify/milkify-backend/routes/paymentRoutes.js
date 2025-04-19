const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.get("/", paymentController.getPayments);
router.post("/", paymentController.addPayment);
router.put("/:id", paymentController.updatePayment);
router.delete("/:id", paymentController.deletePayment);

// Weekly and Monthly Avg
router.get("/averages", paymentController.getAverages);

module.exports = router;
