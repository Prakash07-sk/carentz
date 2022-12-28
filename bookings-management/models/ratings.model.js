var mongoose = require("mongoose");

var RatingsSchema = new mongoose.Schema({
  vehicleNo: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  avg: {
    type: Number,
  },
  count: {
    type: Number,
    validate: {
      validator: Number.isInteger,
    },
  },
  listReview: [
    {
      clientEmailId: String,
      comment: String,
    },
  ],
});

module.exports = mongoose.model("ratings", RatingsSchema);
