const mysql = require("mysql2/promise");

const dbConfig = {
  host: "localhost", // or the relevant host
  user: "root", // your database user
  database: "estore", // your database name
  password: "vishal123", // your database password
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;
