const express = require('express');
const router = express.Router();

const user_Controller = require('../controllers/payment.controller');
router.post('/payment', user_Controller.Payment);
router.get('/get/:orderId', user_Controller.GetPayment);



module.exports = router;