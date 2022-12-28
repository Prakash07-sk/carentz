const ChatModel = require("../models/chat.model");

exports.addChat = async (req, res) => {
  let code = 201;
  let response = "success";
  const message = req.body;
  message.currentDateTime = new Date();
  const clientEmailId = message.fromId;
  const vendorEmailId = message.toId;
  if (!message.messages) {
    code = 400;
    response = "Message is empty";
  }
  try {
    const chatList = await ChatModel.find({ clientEmailId, vendorEmailId });
    if (chatList.length !== 0) {
      const messageList = [message, ...chatList[0].list];
      response = messageList;
      await ChatModel.updateOne(chatList[0], { list: messageList });
    } else {
      const chatList2 = await ChatModel.find({
        clientEmailId: vendorEmailId,
        vendorEmailId: clientEmailId,
      });
      if (chatList2.length !== 0) {
        const messageList = [message, ...chatList2[0].list];
        response = messageList;
        await ChatModel.updateOne(chatList2[0], { list: messageList });
      } else {
        const newMessageList = [message];
        const chat = {
          chatId: vendorEmailId + clientEmailId,
          clientEmailId,
          vendorEmailId,
          list: newMessageList,
        };
        response = newMessageList;
        const chatSave = new ChatModel(chat);
        await chatSave.save(chat);
      }
    }
  } catch (error) {
    code = 400;
    response = "An error occured";
  }
  res.status(code).send(response);
};

exports.getVendorsByClientmailId = async (req, res) => {
  const { clientEmailId } = req.params;
  let code = 200;
  let response = [];
  try {
    const chatList = await ChatModel.find({ clientEmailId });
    if (chatList.length !== 0)
      response = chatList.map((chat) => chat.vendorEmailId);
  } catch (error) {
    code = 400;
    response = "An error occured";
  }
  res.status(code).send(response);
};

exports.getClientsByVendormailId = async (req, res) => {
  const { vendorEmailId } = req.params;
  let code = 200;
  let response = [];
  try {
    const chatList = await ChatModel.find({ vendorEmailId });
    if (chatList.length !== 0)
      response = chatList.map((chat) => chat.clientEmailId);
  } catch (error) {
    code = 400;
    response = "An error occured";
  }
  res.status(code).send(response);
};

exports.getMessages = async (req, res) => {
  const { vendorEmailId, clientEmailId } = req.params;
  let code = 200;
  let response = [];
  try {
    const chatList = await ChatModel.find({ vendorEmailId, clientEmailId });
    if (chatList.length !== 0) response = chatList[0].list;
  } catch (error) {
    code = 400;
    response = "An error occured";
  }
  res.status(code).send(response);
};
