const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");


const hackathonRoutes = require("./routes/hackathonRoutes");
const userRouterMDB = require("./routes/userRoutesMDB");

dotenv.config();

const app = express();

const allowList = [process.env.ALLOWED_URL_1, process.env.ALLOWED_URL_2];

var corsOptionsDelegate = function (req, callback) {
  var corsOptions = {
    credentials: true,
  };

  if (allowList.indexOf(req.header("Origin")) !== -1) {
    corsOptions.origin = true; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions.origin = false; // disable CORS for this request
  }

  callback(null, corsOptions); // callback expects two parameters: error and options
};
app.use(express.static(__dirname + "/uploads/"));

app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(globalErrorHandler);

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors({ ...corsOptionsDelegate, methods: "*" }));

app.use("/test", (req, res) => {
  res.send("Working");
});

//All the routes comes here

app.get("/app/v1", (req, res, next) => {
  res.send("Test working");
});

//mongo routes to check
app.use("/app/v1/MDB/users", userRouterMDB);

//commented to check mongo as I dont have env things for SQL
// app.use("/app/v1/users", userRouter);
app.use("/api/hackathon", hackathonRoutes);

app.use("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
