const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const chatRoutes = require("./routes/chat.routes");

const port = 8086;
const app = express();



const url = "mongodb://mongo:27017/chat-app";
const mongoDB = process.env.MONGODB_URI || url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error!!!"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/v3", chatRoutes);

app.listen(port, function () {
  console.log("server running at port : " + port);
});

