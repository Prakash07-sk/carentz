const EmailService = require('../models/emailService');
const OTPService = require('../models/otpService');

exports.sendOTP = (req, res) => {
    var otpValue = Math.floor(100000 + Math.random() * 900000);

    let message = {
        from: 'carentz70@gmail.com',
        to: req.query.emailId,
        subject: `caRentz Two factor authentication OTP assistance`,
        html: ` <div style="padding: 0 2rem 2rem 2rem; font-size:18px">
            <h1 style=" font-size: 1.5rem;"> CaRentz </h1>
            <hr/>
            <p>To authenticate, please use the following One Time Password (OTP): </p><br/>
            <b style="font-size:1.5rem">${otpValue}</b> <br/>
            <p>Don't share this OTP with anyone. This OTP will expires within 5 minutes</p>
    </div>`

    }
    EmailService.sendMail(message, (err, result) => {

        if (err) {
            return res.send(400, "Email not send...")
        }
        var data = new OTPService({
            emailId: req.query.emailId,
            otp: otpValue
        })
        data.save()
            .then(() => res.send("send OTP"))
            .catch(err => res.send(400, err))


    })


}

exports.verifyOTP = (req, res) => {
    console.log(req.query.emailId);
    OTPService.findOne({ emailId: req.query.emailId }).sort({'_id':-1}).limit(1).then(result => {
        if (result.otp === parseInt(req.query.otp)) {
            OTPService.deleteMany({emailId: req.query.emailId}).then(() => {
                res.send("Otp verified successfully!!!")
            })
                .catch(err => {
                    res.send(400, err)
                })
        } else {
            res.send(400, "Wrong otp entered")
        }
    })
        .catch(err => {
            res.send(400, "Wrong otp entered")
        })


}