const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bookingRoutes = require("./routes/carbooking.routes");
const vehicleRoutes = require("./routes/vehicle.routes");
const ratingsRoutes = require("./routes/ratings.routes")

const port = 8087;
const app = express();

//cross origin
var cors = require('cors')
app.use(cors());

const url = "mongodb://mongo:27017/booking-management";
const mongoDB = process.env.MONGODB_URI || url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error!!!"));

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}));
app.use("/api/v4", [vehicleRoutes, bookingRoutes,ratingsRoutes]);

app.listen(port, function () {
  console.log("server running at port : " + port);
});
