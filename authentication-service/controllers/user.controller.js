var jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const mysqlConfig = {
    host: "mysql-1",
    user: "cntz",
    password: "Carentz",
    database: "Authentication"
}


  var Authentication = null
  
require('dotenv').config();
const secretKey = process.env.JWT_SECRET_KEY;


exports.Login = (req, res) => {
    const generateToken = () => {
        return (Math.random() + 1).toString(36).substring(7);
    }
    const getToken = { generateToken }

    Authentication = mysql.createConnection(mysqlConfig);
    var query = "CREATE TABLE IF NOT EXISTS client (email_id varchar(255) PRIMARY KEY, clientrole varchar(255), password varchar(255) NOT NULL)";
    Authentication.query(query, err => {
        if(err) throw err;
    })

    var query = "select * from client where email_id = '" + req.body.emailId + "' and password = '" + req.body.password + "'";
    Authentication.query(query, function (err, result) {
        if (err || result.length === 0) {
            return res.send(400, "invalid login credentials")
        }
        jwt.sign(getToken, secretKey, { expiresIn: '1d' }, (err, token) => {
            const responseData = Object.assign({}, result[0]);
            var data = {
                emailId: responseData.email_id,
                role: responseData.clientrole,
                token: token
            }
            res.send(data);

        })
    });
}

exports.Validate = (req, res) => {
    jwt.verify(req.headers.authentication, secretKey, (err) => {
        if (err) {
            return res.send(403, "login faild")
        }
        res.send("Token validate successfull");
    })
}

exports.UpdatePassword = (req, res) => {

    var query = "update client set password = '" + req.body.password + "' where email_id = '" + req.body.emailId + "'";
    Authentication = mysql.createConnection(mysqlConfig);
    Authentication.query(query, (err) => {
        if (err) {
            return res.send(400, "invalid login credentials")
        }
        res.send("Password update successfull!!!...")
    })


}