const express = require('express');
const bodyParser = require('body-parser');
const user = require('./routes/user.routes')
const port = 8080;
const app = express();
const socket = require('./controllers/sockets.controller');
const http = require('http').createServer(app);


//cross origin
var cors = require('cors')
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}));
app.use('/',user)



http.listen(port, function () {
    console.log("server running at port :" + port);
});

socket(http);
