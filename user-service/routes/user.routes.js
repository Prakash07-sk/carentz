const express = require('express');
const router = express.Router();


const use_client_controller = require('../controllers/user.client.controller');
router.post('/client/register', use_client_controller.ClientRegister);
router.get('/client/:emailId', use_client_controller.GetProfile);
router.put('/client/:emailId', use_client_controller.UpdateProfile);

const use_vendor_controller = require('../controllers/user.vendor.controller');
router.post('/vendor/register', use_vendor_controller.VendorRegister);
router.get('/vendor/:emailId', use_vendor_controller.GetProfile);
router.put('/vendor/:emailId', use_vendor_controller.UpdateProfile);


module.exports = router;