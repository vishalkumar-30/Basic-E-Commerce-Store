const express = require("express");
const cors = require("cors"); // Import cors
const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const pool = require('./config/databases'); 
const app = express();
// const mysql = require('mysql2');

// // Set up connection to the database
// const pool = mysql.createPool({
//   host: 'localhost', // Assuming MySQL is running locally
//   user: 'root', // Your MySQL username
//   password: '', // Your MySQL password
//   database: 'estore', // Your database name
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// // This line makes the promise-based interface available for easier query handling
// const promisePool = pool.promise();


app.use(cors());
app.use(express.json());

// Example of using the database connection
// This is just to illustrate the connection; adjust according to your actual app needs
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    res.json({ solution: rows[0].solution });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).send('Database connection error');
  }
});

// Enable All CORS Requests
app.use(cors());

// Parse JSON request body
app.use(express.json());

// Mount user routes
app.use("/", userRoutes);

// Mount item routes
app.use("/", itemRoutes);

// Mount cart routes
app.use("/", cartRoutes);

// Mount order routes
app.use("/", orderRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
