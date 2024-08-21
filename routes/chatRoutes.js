const chatRouter = require("express").Router();
const chatCntrl = require("../controllers/chatController");

//get all chats
chatRouter.get("/", chatCntrl.getAllChats);

//create chat
chatRouter.post("/", chatCntrl.createChat);

module.exports = chatRouter;
