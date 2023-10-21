const dotenv = require("dotenv");
const app = require("./app");
const sequelize = require("./db");

dotenv.config();

//sync sequelize
(async () => {
  try {
    await sequelize.sync({ force: false }); // Set force to true to drop and re-create tables on every application start
    console.log("Database synchronized.");
  } catch (error) {
    console.error("Error synchronizing the database:", error);
  }
})();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server Started on Port", PORT);
});
