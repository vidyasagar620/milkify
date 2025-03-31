const express = require("express");
const { verifyToken } = require("./auth");

const router = express.Router();

router.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: "Welcome to the admin dashboard!" });
});

module.exports = router;
