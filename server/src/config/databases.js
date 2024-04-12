// Import mysql2/promise for promise-based interaction
// Correct import for using mysql2 with promise support
const mysql = require("mysql2/promise");

// Set up your database connection details
const dbConfig = {
  host: "localhost", // or the relevant host
  user: "root", // your database user
  database: "estore", // your database name
  password: "vishal123", // your database password
};

// Create a MySQL connection pool (recommended for production use)
// or a single connection for simple use cases or development
const pool = mysql.createPool(dbConfig);

// Export the pool (or connection)
module.exports = pool;
