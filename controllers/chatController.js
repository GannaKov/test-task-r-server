const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const getAllChats = async (req, res, next) => {
  try {
    const result = await Chat.find();
    if (result.length === 0) {
      throw { status: 404, message: "No chat found" };
    }

    res.status(200).json({ status: "success", code: 200, data: result });
  } catch (err) {
    next(err);
  }
};

const createChat = async (req, res, next) => {
  try {
    const user = req.user;
    const userId = user._id;
    // const { participant } = req.body;

    // if chat already exists with the same participant
    const existingChat = await Chat.findOne({ participant: userId });

    if (existingChat) {
      return res.status(200).json({
        status: "Chat already exists",
        code: 200,
        data: existingChat,
      });
    }

    //create new chat

    const newChat = new Chat({
      //   title,
      participant: userId,
    });

    const result = await newChat.save();
    await User.findByIdAndUpdate(userId, { chatId: result._id });

    res.status(201).json({ status: "Created", code: 201, data: result });
  } catch (err) {
    next(err);
  }
};

const getChatById = async (req, res, next) => {
  try {
    const chat = req.chat;

    res.status(200).json({ status: "success", code: 200, data: chat });
  } catch (err) {
    next(err);
  }
};

const deleteChat = async (req, res, next) => {
  try {
    const chat = req.chat;
    const result = await Chat.findByIdAndDelete(chat._id);

    res
      .status(200)
      .json({ status: "success deleted", code: 200, data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createChat,
  getAllChats,
  getChatById,
  deleteChat,
};
