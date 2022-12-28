const express = require('express');
const router = express.Router();

const user_Controller = require('../controllers/user.controller');
router.post('/login', user_Controller.Login);
router.get('/validate', user_Controller.Validate);
router.put('/password', user_Controller.UpdatePassword);


module.exports = router;