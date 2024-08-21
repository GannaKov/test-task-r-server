const Chat = require("../models/chatModel");

const findChatById = async (req, res, next) => {
  console.log("req.params", req.params);
  try {
    const chatId = req.params.id;
    console.log("chatid", chatId);
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    req.chat = chat;
    next();
  } catch (err) {
    console.log("err", err);
    next(err);
  }
};
module.exports = { findChatById };
