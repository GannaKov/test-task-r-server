const Chat = require("../models/chatModel");

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
    const { participant } = req.body;

    const newChat = new Chat({
      //   title,
      participant,
    });

    const result = await newChat.save();

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
