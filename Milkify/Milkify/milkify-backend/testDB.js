const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

async function testDBConnection() {
  try {
    await client.connect();
    console.log("✅ Database Connected Successfully!");
    await client.end();
  } catch (error) {
    console.error("❌ Database Connection Error:", error.message);
  }
}

testDBConnection();
