var mongoose = require("mongoose");

var BookingsSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  clientEmailId: String,
  vehicleNo: String,
  fromDatetime: String,
  toDatetime: String,
  totalFare: String,
});

module.exports = mongoose.model("carbookings", BookingsSchema);
