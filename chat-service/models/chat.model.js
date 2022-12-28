var mongoose = require("mongoose");

var chatSchema = new mongoose.Schema({
    chatId: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },
  vendorEmailId: String,
  clientEmailId: String,
  list: [
    {
      fromId: String,
      toId: String,
      messages: String,
      currentDateTime: Date,
    },
  ],
});




module.exports = mongoose.model("chat", chatSchema);
