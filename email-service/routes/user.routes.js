const express = require('express');
const router = express.Router();

const user_Controller = require('../controllers/email.controller');
router.post('/email', user_Controller.SendEmail);

const use_otp_controller = require('../controllers/otp.controller');
router.post('/sendOtp', use_otp_controller.sendOTP);
router.post('/verifyOtp', use_otp_controller.verifyOTP);



module.exports = router;