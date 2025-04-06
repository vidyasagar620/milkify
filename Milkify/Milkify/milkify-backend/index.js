const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes"); // ✅ Import Auth Routes
// const supplierRoutes = require("./routes/suppliers"); // Import the suppliers route

const app = express();
app.use(cors());
app.use(express.json()); // ✅ Middleware to parse JSON requests

// ✅ Register Routes
app.use("/api/auth", authRoutes); // Make sure this matches the Postman URL

app.get("/", (req, res) => {
  res.send("Milkify Backend is Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

const productRoutes = require("./routes/productRoutes"); // ✅ Import Product Routes
app.use("/api/products", productRoutes); // ✅ Mount Product Routes

const supplierRoutes = require("./routes/supplierRoutes");
app.use("/api/suppliers", supplierRoutes);

const collections = require("./routes/collections");
app.use("/api/collections", collections);

// ✅ Use Routes
app.use(supplierRoutes);
app.get("/api/farm-stats", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM farm_stats");
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err);
  }
});
