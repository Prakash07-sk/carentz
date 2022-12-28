const Razorpay = require('../models/razorpay');
const mysql = require('mysql2');
const mysqlConfig = {
    host: "mysql-2",
    user: "cntz",
    password: "Carentz",
    database: "Payment"
}
var OrderDB = null;


exports.Payment = (req, res) => {

    var amount = req.query.amount;
    var currency = 'INR';
    var receipt = ( Math.floor(100000 + Math.random() * 900000)).toString();

    Razorpay.orders.create({amount, currency, receipt}).then(data => {
        OrderDB = mysql.createConnection(mysqlConfig);

        var query = "CREATE TABLE IF NOT EXISTS paymentDetails (orderId varchar(255) PRIMARY KEY, bookingId varchar(255) NOT NULL UNIQUE, amount INT)";
        OrderDB.query(query, err => {
            if(err) throw err;
        })

        var query = "insert into paymentDetails values('" + data.id + "', '" + data.receipt + "', '" + data.amount + "')";
        OrderDB.query(query, err=> {
            if(err) {
                return res.send(err)
            }
            return res.send(data);
        })
        
    })
    .catch(err => {
        return res.status(400).send(err);
    })
}

exports.GetPayment = (req, res) => {
    var query = "select * from paymentDetails where orderId = '" + req.params.orderId + "';";

    OrderDB.query(query, (err, result) => {
        if(err || result.length === 0) {
            return res.status(400).send(err);
        }
        const responseData = Object.assign({}, result[0]);
        return res.send(responseData);
    })
}