// const mysql2=require("mysql2")
// const dotenv = require("dotenv");

// dotenv.config();

// const dbConnection = mysql2.createPool({
//     host:process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
// });

// dbConnection.getConnection((err, connection) => {
//   if (err) {
//     console.error("Database connection failed:", err.message);
//     process.exit(1); // Exit the application if connection fails
//   } else {
//     console.log("Successfully connected to the database.");
//     connection.release(); // Release the connection back to the pool
//   }
// });

// // Test the pool with a promise-based query
// dbConnection
//   .promise()
//   .query("SELECT 1")
//   .then(() => console.log("Database pool is operational"))
//   .catch((err) => {
//     console.error("Database pool test failed:", err.message);
//     process.exit(1);
//   });

// module.exports = dbConnection.promise();


// config/db.js


const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql', 
    port: process.env.DB_PORT ,
    logging: false
  }
);


module.exports = sequelize;

