const Message = require("../models/messageModel");

const findMessageById = async (req, res, next) => {
  try {
    const messageId = req.params.messageId;
    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    req.message = message;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { findMessageById };
