const { response } = require("express");
const Ratings = require("../models/ratings.model");
const VehicleDetails = require("../models/vehicle.model");

exports.addReview = async (req, res) => {
  const { vehicleNo } = req.query;
  const { comment, clientEmailId } = req.body;
  let code = 400,
    response = [];
  if (!vehicleNo || !comment || !clientEmailId) {
    response = "VehicleNo or Comment or ClientemailId is null";
  }
  try {
    const vehicle = await VehicleDetails.findOne({ vehicleNo });
    if (!vehicle) response = "Vehicle not found";
    const rating = await Ratings.findOne({ vehicleNo });
    if (!rating) {
      const newRating = {
        vehicleNo,
        avg: 0.0,
        count: 0,
        listReview: [{ comment, clientEmailId }],
      };
      const ratingSave = new Ratings(newRating);
      await ratingSave.save(newRating);
      code = 201;
      response = "Successfully saved Rating";
    } else {
      await Ratings.updateOne(rating, {
        listReview: [...rating.listReview, { comment, clientEmailId }],
      });
      code = 201;
      response = "Successfully saved Rating";
    }
  } catch (error) {
    response = "An error occurred";
  }
  res.status(code).send(response);
};

exports.getRatingCount_ByVehicleNo = async (req, res) => {
  const { vehicleNo } = req.params;
  try {
    const resp = await Ratings.findOne({ vehicleNo });
    res.send(resp);
  } catch (error) {
    res.send(error);
  }
};

exports.addRating = async (req, res) => {
  const { vehicleNo, rating } = req.params;
  let code = 400,
    response = [];
  if (!vehicleNo) {
    response = "Please provide vehicleNo";
  }
  if (rating > 5 || rating < 1) {
    return res.send("Please rate between 1 and 5");
  }
  const vehicle = await VehicleDetails.findOne({ vehicleNo });
  if (!vehicle) response = "Vehicle not found";
  const ratings = await Ratings.findOne({ vehicleNo });
  if (!ratings) {
    const newRatings = {
      vehicleNo,
      avg: rating,
      count: 1,
      listReview: [],
    };
    const ratingSave = new Ratings(newRatings);
    await ratingSave.save(newRatings);
    code = 201;
    response = "Successfully saved Rating";
  } else {
    const count = ratings.count + 1;
    const variable = ratings.avg * ratings.count + parseInt(rating);
    const avg = variable / count;

    await Ratings.updateOne(ratings, { avg, count });
    code = 201;
    response = "Successfully saved Rating";
  }
  res.status(code).send(response);
};
