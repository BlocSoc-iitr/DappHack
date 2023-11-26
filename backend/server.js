const dotenv = require("dotenv");
const app = require("./app");
//const sequelize = require("./db");
const mongoose = require("mongoose");

dotenv.config();

//mongodb connection
const dbMongo = process.env.DATABASE_CONNECTION_URI;

//console.log(dbMongo);
mongoose
  .connect(dbMongo, {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Database connection successful!"));

//sync sequelize
// (async () => {
//   try {
//     await sequelize.sync({ force: false }); // Set force to true to drop and re-create tables on every application start
//     console.log("Database synchronized.");
//   } catch (error) {
//     console.error("Error synchronizing the database:", error);
//   }
// })();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server Started on Port", PORT);
});
