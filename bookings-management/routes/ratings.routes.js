const express = require("express");
const rating_controller = require("../controllers/ratings.controller");

const router = express.Router();

const { addReview, getRatingCount_ByVehicleNo, addRating } = rating_controller;
router.post("/addreview", addReview);
router.post("/addrating/:vehicleNo&:rating", addRating);
router.get("/getratingCount/:vehicleNo", getRatingCount_ByVehicleNo);

module.exports = router;
