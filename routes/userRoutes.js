const userRouter = require("express").Router();
const userCntrl = require("../controllers/userController");
const { findUserById } = require("../middlewares/findUserById");

//get all users
userRouter.get("/", userCntrl.getAllUsers);
//get all contacts (users with owner: false)
userRouter.get("/contacts", userCntrl.getAllContacts);
//get current User  (users with owner: true)
userRouter.get("/current-user", userCntrl.getCurrentUser);
//get users without chat
userRouter.get("/withoutchat", userCntrl.getUsersWithoutChat);

//get users with chat
userRouter.get("/withchat", userCntrl.getUsersWithChat);

//get user by id
userRouter.get("/:id", findUserById, userCntrl.getUserById);

//---- change user
userRouter.put("/:id", findUserById, userCntrl.changeUser);

//create user
userRouter.post("/", userCntrl.createUser);

module.exports = userRouter;
