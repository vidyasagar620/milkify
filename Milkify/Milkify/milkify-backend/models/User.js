const { Pool } = require("pg");
const pool = require("../config/db");

const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'admin'
    );
  `;
  await pool.query(query);
};

module.exports = { createUserTable };
