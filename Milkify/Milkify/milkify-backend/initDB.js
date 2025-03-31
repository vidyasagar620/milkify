const { createUserTable } = require("./models/User");

const initializeDatabase = async () => {
  try {
    await createUserTable();
    console.log("✅ Users table created successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error creating tables:", error);
    process.exit(1);
  }
};

initializeDatabase();
