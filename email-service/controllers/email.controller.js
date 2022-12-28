const EmailService = require('../models/emailService');

exports.SendEmail = (req, res) => {
    var bookingDetails = JSON.parse(req.body.body);
    console.log(bookingDetails);

    let message = {
        from: 'carentz70@gmail.com',
        to: req.body.to,
        subject: `caRentz Booking Confirmation Booking #${bookingDetails.bookingId}`,
        html: ` <div style="background: #edf7f6; padding: 2rem 2rem 2rem 2rem; font-size: 1.5rem;">
        <center>
            <h1> CaRentz </h1>
            <p> Congratulations!! Your Ride is successfully booked with CaRentz.\nPlease find your Booking details
            </p>
            <h3>Booking Id : ${bookingDetails.bookingId}</h3>
            <h3>Vehicle No : ${bookingDetails.vehicleNo}</h3>
            <h3>From Date : ${bookingDetails.fromDatetime}</h3>
            <h3>To Date : ${bookingDetails.toDatetime}</h3>
            <h3>Total fare : &#x20b9; ${bookingDetails.totalFare}</h3>
        </center>
    </div>`

    }

    EmailService.sendMail(message, (err, result) => {
        if (err) {
            return res.status(400).send("Email not send...");
        }
        res.send("Email sent successfully....");
    })

}