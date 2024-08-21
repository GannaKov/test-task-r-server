const messageRouter = require("express").Router();
const messageCntrl = require("../controllers/messageController");
const { findChatById } = require("../middlewares/findChatById");
const { findMessageById } = require("../middlewares/findMessageById");

//create message
messageRouter.post("/:id", findChatById, messageCntrl.createMessage);

// Update message
messageRouter.put("/:messageId", findMessageById, messageCntrl.updateMessage);

module.exports = messageRouter;
