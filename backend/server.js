const dotenv = require("dotenv");
const app = require("./app");
const mongoose = require("mongoose");

dotenv.config();
const PORT = process.env.PORT || 4000;
//mongodb connection
const dbMongo = process.env.DATABASE_CONNECTION_URI;

//console.log(dbMongo);
mongoose
  .connect(dbMongo, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDB Database connection successful!");
    app.listen(PORT, () => {
      console.log("Server Started on Port", PORT);
    });
  });
