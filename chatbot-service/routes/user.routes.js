const express = require('express');
const router = express.Router();

const chatbot_controller = require('../controllers/chatBot.controller');
router.post('/chatbot-message', chatbot_controller.chatbot);




module.exports = router;