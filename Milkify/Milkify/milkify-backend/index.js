const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./config/db"); // ✅ Fix for farm-stats

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Import routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const collections = require("./routes/collections");
const paymentRoutes = require("./routes/paymentRoutes");

// ✅ Use routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/collections", collections);
app.use("/api/payments", paymentRoutes); // ✅ Corrected here

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Milkify Backend is Running");
});

// ✅ Farm Stats route
app.get("/api/farm-stats", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM farm_stats");
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
