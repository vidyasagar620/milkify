const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const paymentRoutes = require("./routes/paymentRoutes");

// Import routes
const supplierRoutes = require("./routes/supplierRoutes"); // ✅ use correct path
const paymentRoutes = require("./routes/paymentRoutes");   // ✅ your payment routes
const contactRoutes = require("./routes/contactRoutes");

// Middleware
app.use(cors());
app.use(bodyParser.json()); // To handle JSON requests

// Routes
app.use("/api", paymentRoutes);

// Middleware
app.use(cors());
app.use(express.json());

// Route mounting
app.use("/api/suppliers", supplierRoutes); // 👈 use correct path
app.use("/api", paymentRoutes);            // 👈 this is good

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
const contactRoutes = require("./routes/contactRoutes");
app.use("/api", contactRoutes);
