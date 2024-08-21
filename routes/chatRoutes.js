const chatRouter = require("express").Router();
const chatCntrl = require("../controllers/chatController");
const { findChatById } = require("../middlewares/findChatById");
const { findUserById } = require("../middlewares/findUserById");

//get all chats
chatRouter.get("/", chatCntrl.getAllChats);

//get chat by Id
chatRouter.get("/:id", findChatById, chatCntrl.getChatById);

//create chat
chatRouter.post("/:id", findUserById, chatCntrl.createChat); //here id - userId

//delete chat
chatRouter.delete("/:id", findChatById, chatCntrl.deleteChat);

module.exports = chatRouter;
