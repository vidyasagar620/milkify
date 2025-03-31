const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes"); // ✅ Import Auth Routes

const app = express();
app.use(cors());
app.use(express.json()); // ✅ Middleware to parse JSON requests

// ✅ Use Routes
app.use("/api/auth", authRoutes); // Ensure this is correct

app.get("/", (req, res) => {
  res.send("Milkify Backend is Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
