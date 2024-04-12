const express = require("express");
const cors = require("cors"); // Import cors
const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const pool = require("./config/databases");
const app = express();
// const mysql = require('mysql2');

// const pool = mysql.createPool({
//   host: 'localhost', // Assuming MySQL is running locally
//   user: 'root', // Your MySQL username
//   password: '', // Your MySQL password
//   database: 'estore', // Your database name
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// const promisePool = pool.promise();

app.use(cors());
app.use(express.json());

app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS solution");
    res.json({ solution: rows[0].solution });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).send("Database connection error");
  }
});

app.use(cors());

app.use(express.json());

app.use("/", userRoutes);

app.use("/", itemRoutes);

app.use("/", cartRoutes);

app.use("/", orderRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
