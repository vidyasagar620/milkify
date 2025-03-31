const supplierRoutes = require("./routes/supplierRoutes");
app.use("/api/suppliers", supplierRoutes);
const express = require("express");
const cors = require("cors");
const app = express();
const supplierRoutes = require("./routes/suppliers");

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Use the supplier routes
app.use(supplierRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
