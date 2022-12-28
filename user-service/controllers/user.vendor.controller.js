const Vendor = require('../models/vendor');
const mysql = require('mysql2');
const mysqlConfig = {
    host: "mysql-1",
    user: "cntz",
    password: "Carentz",
    database: "Authentication"
}

var con = null


exports.VendorRegister = (req, res) => {
    var userData = new Vendor({
        emailId: req.body.emailId,
        mobileNumber: req.body.mobileNumber,
        password: null,
        name: req.body.name,
        image: null,
        address: null
    });

    con = mysql.createConnection(mysqlConfig);
    var query = "CREATE TABLE IF NOT EXISTS client (email_id varchar(255) PRIMARY KEY, clientrole varchar(255), password varchar(255) NOT NULL)";
    con.query(query, err => {
        if (err) throw err;
    })

    var sql = "INSERT INTO client VALUES ('" + req.body.emailId + "', 'VENDOR', '" + req.body.password + "')";
    con.query(sql, function (err, result) {
        if (err) {
            return res.send(400, "Email Id is already registered");
        };
        userData.save().then(() => {
            res.send("Register as Vendor successfully!!...")
        })
            .catch(err => {
                if (err.code === 11000) {
                    return res.send(400, "Email Id is already registered");
                }
                res.send(400, err)
            })

    });




}

exports.GetProfile = (req, res) => {
    var emailId = req.params.emailId;
    Vendor.findOne({ emailId: emailId }).then(data => {
        if (!data) {
            return res.send(400, "Email not registered")
        }
        res.send(data);
    })
        .catch(err => {
            res.send(400, err)
        })
}

exports.UpdateProfile = (req, res) => {
    var emailId = req.params.emailId;
    Vendor.updateOne({ emailId: emailId }, { $set: req.body }).then(() => {

        Vendor.findOne({ emailId: emailId }).then(data => {
            res.send(data);
        })
            .catch(err => {
                res.send(400, err);
            })

    })
        .catch(err => {
            res.send(400, err);
        })
}