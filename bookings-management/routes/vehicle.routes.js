const express = require("express");
const vehicle_controller = require("../controllers/vehicle.controller");

const router = express.Router();

const {
  getVehicleByVehicleNo,
  getAllAvailableVehicles,
  getVehicleByVendor,
  addVehicleDetails,
  getAllAvailableVehiclesByFilter,
} = vehicle_controller;

router.get("/getvehicledetails/:vehicleNo", getVehicleByVehicleNo);
router.get("/getvehicleByVendor/:vendorEmailId", getVehicleByVendor);
router.get("/getallavailablevehicle", getAllAvailableVehicles);
router.post("/addvehicle", addVehicleDetails);
router.get("/getvehiclebyfilters", getAllAvailableVehiclesByFilter);

module.exports = router;
