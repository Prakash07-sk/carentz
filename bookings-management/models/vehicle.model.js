const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  vehicleNo: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  vendorEmailId: String,
  brandName: String,
  modelName: String,
  category: String,
  colour: String,
  fuel: String,
  transmission: String,
  average: String,
  location: String,
  fare: String,
  description: String,
  available: Boolean,
  yearOfpurchase: String,
  seats: String,
  noOftrips: {
    type: Number,
    validate: {
      validator: Number.isInteger,
    },
  },
  image: String,
});

module.exports = mongoose.model("vehicle-bookings", vehicleSchema);
