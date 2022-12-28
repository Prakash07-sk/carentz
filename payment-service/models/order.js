const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Vishnu@1",
});

con.connect( () => {
    con.query(`CREATE DATABASE IF NOT EXISTS Payment;`, (err, result) => {
        if(err) throw err;
    });

    con.changeUser({database: 'Payment'});

    var query = "CREATE TABLE IF NOT EXISTS paymentDetails (orderId varchar(255) PRIMARY KEY, bookingId varchar(255) NOT NULL UNIQUE, amount INT)";
    con.query(query, err => {
        if(err) throw err;
    })
})

module.exports = con;
