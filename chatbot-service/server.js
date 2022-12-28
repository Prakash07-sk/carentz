const express = require('express');
const bodyparser = require('body-parser');
const port = 8800;
const app = express();
const user = require('./routes/user.routes');

//cross origin
var cors = require('cors')
app.use(cors());


app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use('/', user)



app.listen(port, function () {
    console.log("server running at port :" + port);
});

