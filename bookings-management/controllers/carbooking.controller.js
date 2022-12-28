const CarBooking = require("../models/carbooking.model");
const VehicleDetails = require("../models/vehicle.model");

exports.getBookingDetailsById = (req, res) => {
  const { bookingId } = req.params;
  CarBooking.findOne({ bookingId: bookingId }, (err, result) => {
    if (err) return res.status(400).send(err);
    res.send(result);
  });
};

exports.getAllBookingsByClientEmailId = (req, res) => {
  const { clientEmailId } = req.params;
  CarBooking.find({ clientEmailId: clientEmailId }, (err, result) => {
    if (err) return res.status(400).send(err);
    res.send(result);
  });
};

exports.getAllBookingsByVehicleNo = (req, res) => {
  const { vehicleNo } = req.params;
  CarBooking.find({ vehicleNo: vehicleNo }, (err, result) => {
    if (err) return res.status(400).send(err);
    res.send(result);
  });
};

exports.addBooking = (req, res) => {
  const reqBody = { ...req.body };
  const { vehicleNo, toDatetime, fromDatetime } = reqBody;
  VehicleDetails.findOne({ vehicleNo: vehicleNo }, (err, result) => {
    if (err || !result)
      return res.status(400).send("unable to find vehicle No");
    const noOfDays =
      (new Date(toDatetime).getTime() - new Date(fromDatetime).getTime()) /
      (1000 * 3600 * 24);
    let totalFare = parseInt(result.fare) * noOfDays;
    if (noOfDays > 1) {
      totalFare = totalFare * (1 - 0.05 * (noOfDays - 1));
    }
    reqBody.totalFare = totalFare;
    const booking = new CarBooking(reqBody);
    booking.save((err, result) => {
      if (err) return res.status(400).send("unable to book");
      VehicleDetails.findOne({ vehicleNo }, (err, resp) => {
        if (err) return res.status(400).send(err);
        const noOftrips = resp.noOftrips + 1;
        VehicleDetails.updateOne({vehicleNo: vehicleNo}, { $set: { noOftrips: noOftrips } }, (err) => {
          if (err) return res.status(400).send(err);
          res.send(result);
        });
      });
    });
  });
};
