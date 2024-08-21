const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");

const createMessage = async (req, res, next) => {
  try {
    const chat = req.chat;
    const chatId = chat._id;
    const { senderId, text } = req.body;

    const newMessage = new Message({
      senderId,
      text,
      chatId,
    });

    const result = await newMessage.save();

    await Chat.findByIdAndUpdate(chatId, { $push: { messages: result._id } });

    res.status(201).json({ status: "Created", code: 201, data: result });
  } catch (err) {
    next(err);
  }
};

const updateMessage = async (req, res, next) => {
  try {
    const message = req.message;
    const { text } = req.body;

    if (!text) {
      return res
        .status(400)
        .json({ message: "Text is required to update the message" });
    }

    // Обновляем текст сообщения
    message.text = text;
    const updatedMessage = await message.save();

    res
      .status(200)
      .json({ status: "Updated", code: 200, data: updatedMessage });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createMessage,
  updateMessage,
};
