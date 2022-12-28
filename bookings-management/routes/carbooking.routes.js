const express = require("express");
const carbooking_controller = require("../controllers/carbooking.controller");

const router = express.Router();
const {
  addBooking,
  getBookingDetailsById,
  getAllBookingsByClientEmailId,
  getAllBookingsByVehicleNo,
} = carbooking_controller;

router.post("/addbook", addBooking);
router.get("/getbookingdetails/:bookingId", getBookingDetailsById);
router.get("/getallbooking/:clientEmailId", getAllBookingsByClientEmailId);
router.get("/getallbookingbyvehicle/:vehicleNo", getAllBookingsByVehicleNo);

module.exports = router;
