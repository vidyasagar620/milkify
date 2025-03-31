const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes"); // ✅ Import Auth Routes

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
