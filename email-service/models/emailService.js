var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'carentz70@gmail.com',
        pass: 'alnrqtdkuterwquj',
    },
});

module.exports = transporter;