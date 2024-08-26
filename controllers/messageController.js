const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");
const axios = require("axios");

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

    const quoteResponse = await axios.get(
      "https://api.quotable.io/quotes/random?limit=1&maxLength=100"
    );
    const quote = quoteResponse.data[0].content;

    const autoMessage = new Message({
      //senderId: "auto-response-id",
      senderId: chat.participant,
      text: quote,
      chatId,
    });

    const savedAutoMessage = await autoMessage.save();

    await Chat.findByIdAndUpdate(chatId, {
      $push: { messages: savedAutoMessage._id },
    });
  } catch (err) {
    next(err);
  }
};

// const createMessage = async (req, res, next) => {
//   try {
//     const chat = req.chat;
//     const chatId = chat._id;
//     const { senderId, text } = req.body;

//     const newMessage = new Message({
//       senderId,
//       text,
//       chatId,
//     });

//     const result = await newMessage.save();

//     await Chat.findByIdAndUpdate(chatId, { $push: { messages: result._id } });

//     res.status(201).json({ status: "Created", code: 201, data: result });

//
//     setTimeout(async () => {
//       try {
//         // Запрашиваем случайную цитату
//         const quoteResponse = await axios.get(
//           "https://api.quotable.io/quotes/random?limit=1&maxLength=100"
//         );
//         const quote = quoteResponse.data[0].content;

//         // Создаем автоответное сообщение с цитатой
//         const autoMessage = new Message({
//           //senderId: "auto-response-id",
//           senderId: chat.participant,
//           text: quote,
//           chatId,
//         });

//         const savedAutoMessage = await autoMessage.save();

//         await Chat.findByIdAndUpdate(chatId, {
//           $push: { messages: savedAutoMessage._id },
//         });

//         // console.log("Auto-response sent:", savedAutoMessage);
//       } catch (err) {
//         console.error("Failed to send auto-response:", err);
//       }
//     }, 3000);
//   } catch (err) {
//     next(err);
//   }
// };

const getMessageById = async (req, res, next) => {
  try {
    const message = req.message;

    res.status(200).json({ status: "success", code: 200, data: message });
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
  getMessageById,
};
