// db/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create a new Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_DATABASE,   // Database name
  process.env.DB_USER,       // Database user
  process.env.DB_PASSWORD,   // Database password
  {
    host: process.env.DB_HOST, // Your MySQL host
    dialect: 'mysql',          // Specify the dialect (MySQL)
    logging: false,            // Disable logging (optional)
  }
);

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to MySQL has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
