const express = require('express');
const bodyparser = require('body-parser');
const user = require('./routes/user.routes');
const port = 8085;
const app = express();
const mongoose = require('mongoose');

//cross origin
var cors = require('cors')
app.use(cors());
//connect mongoDB
let url = 'mongodb://mongo:27017/email-service';
const mongodb = process.env.MONGODB_URI || url;
mongoose.connect(mongodb);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error !!!'))
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use('/api/v6', user);




app.listen(port, function () {
    console.log("server running at port :" + port);
});