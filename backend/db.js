const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");

dotenv.config();
const sequelize = new Sequelize(
  process.env.DB_NAME, //server name
  process.env.DB_USER, //username
  process.env.DB_PASS, //password
  {
    host: process.env.DB_HOST, // Change this to your PostgreSQL server address if not running locally
    dialect: "postgres",
  }
);

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
