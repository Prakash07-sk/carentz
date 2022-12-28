const VehicleDetails = require("../models/vehicle.model");
const CarBooking = require("../models/carbooking.model");

exports.getVehicleByVehicleNo = (req, res) => {
  const { vehicleNo } = req.params;
  VehicleDetails.findOne({ vehicleNo }, (err, result) => {
    if (err) return res.status(400).send(err);
    res.send(result);
  });
};

exports.getVehicleByVendor = (req, res) => {
  const { vendorEmailId } = req.params;
  VehicleDetails.find({ vendorEmailId }, (err, result) => {
    if (err) return res.status(400).send(err);
    res.send(result);
  });
};

exports.getAllAvailableVehicles = async (req, res) => {
  const { location, from, to } = req.query;
  let code = 200;
  let response = [];
  const vehiclesList = await VehicleDetails.find({ location });
  if (!vehiclesList || vehiclesList.length === 0) {
    code = 400;
    response = "Vehicle not found";
  } else {
    const allBookingList = await CarBooking.find();
    if (!allBookingList || allBookingList.length === 0) {
      code = 200;
      response = vehiclesList;
    } else {
      vehiclesList.forEach(async (vehicle) => {
        const carBookingList = allBookingList.filter(
          (booking) => booking.vehicleNo === vehicle.vehicleNo
        );
        if (carBookingList.length === 0) response.push(vehicle);
        else {
          let notBooked = true;
          carBookingList.forEach((booking) => {
            if (
              new Date(booking.toDatetime) < new Date(from) ||
              new Date(booking.fromDatetime) > new Date(to)
            ) {
              notBooked = true;
            } else {
              notBooked = false;
            }
          });
          if (notBooked) {
            response.push(vehicle);
          }
        }
      });
    }
  }
  res.status(code).send(response);
};

exports.addVehicleDetails = (req, res) => {
  const reqBody = { ...req.body, available: true, noOftrips: 0 };
  const vehicledetails = new VehicleDetails(reqBody);
  vehicledetails.save((err) => {
    if (err) return res.status(400).send(err);
    res.send("Vehicle details saved Successfully");
  });
};

exports.getAllAvailableVehiclesByFilter = async (req, res) => {
  const { veh, from, to } = req.query;
  const vehicle = JSON.parse(veh);
  let code = 200;
  let response = [];
  const vehiclesList = await VehicleDetails.find({ ...vehicle });

  const allBookingList = await CarBooking.find();
  if (!allBookingList) {
    code = 200;
    response = vehiclesList;
  } else {
    vehiclesList.forEach(async (vehicle) => {
      const carBookingList = allBookingList.filter(
        (booking) => booking.vehicleNo === vehicle.vehicleNo
      );
      if (carBookingList.length === 0) response.push(vehicle);
      else {
        let notBooked = true;
        carBookingList.forEach((booking) => {
          if (
            new Date(booking.toDatetime) < new Date(from) ||
            new Date(booking.fromDatetime) > new Date(to)
          ) {
            notBooked = true;
          } else {
            notBooked = false;
          }
        });
        if (notBooked) {
          response.push(vehicle);
        }
      }
    });
  }

  res.status(code).send(response);
};
