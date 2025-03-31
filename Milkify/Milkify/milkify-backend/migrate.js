const pool = require("./config/db.js");
const { createUserTable } = require("./models/User");

const migrateDatabase = async () => {
  try {
    console.log("🚀 Starting database migration...");

    // Create Users Table
    await createUserTable();

    console.log("✅ Database migration completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Database migration failed:", error);
    process.exit(1);
  }
};

migrateDatabase();
