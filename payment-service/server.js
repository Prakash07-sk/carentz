const express = require('express');
const bodyparser = require('body-parser');
const user = require('./routes/user.routes');
const port = 8084;
const app = express();

//cross origin
var cors = require('cors')
app.use(cors());


app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use('/api/v5', user);




app.listen(port, function () {
    console.log("server running at port :" + port);
});