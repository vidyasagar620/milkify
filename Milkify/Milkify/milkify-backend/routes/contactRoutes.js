const express = require("express");
const router = express.Router();

router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // 👉 For now, just log it (later: send an email or save to DB)
    console.log("📬 New Contact Message:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Contact form error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
