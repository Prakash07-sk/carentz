const express = require("express");
const chat_controller = require("../controller/chat.controller");

const router = express.Router();

const {
  addChat,
  getVendorsByClientmailId,
  getClientsByVendormailId,
  getMessages,
} = chat_controller;

router.post("/chat1", addChat);
router.get("/vendors/:clientEmailId", getVendorsByClientmailId);
router.get("/clients/:vendorEmailId", getClientsByVendormailId);
router.get("/getmessages/:clientEmailId/:vendorEmailId", getMessages);

module.exports = router;
