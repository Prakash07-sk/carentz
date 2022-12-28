const express = require('express');
const bodyparser = require('body-parser');
const user = require('./routes/user.routes');
const port = 8081;
const app = express();
const mongoose = require('mongoose');

//cross origin
var cors = require('cors')
app.use(cors());
//connect mongoDB
let url = 'mongodb://mongo:27017/userService';
const mongodb = process.env.MONGODB_URI || url;
mongoose.connect(mongodb);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error !!!'))

app.use(bodyparser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyparser.json({limit: '50mb'}));
app.use('/api/v1', user);




app.listen(port, function () {
    console.log("server running at port :" + port);
});