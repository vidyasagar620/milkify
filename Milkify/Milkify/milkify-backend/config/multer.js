const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// POST
app.post("/api/products", upload.single("image"), (req, res) => {
  const { name, description, price } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : "";
  // Save to DB here
});
