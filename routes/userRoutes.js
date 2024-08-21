const userRouter = require("express").Router();
const userCntrl = require("../controllers/userController");
const { findUserById } = require("../middlewares/findUserById");

//get all users
userRouter.get("/", userCntrl.getAllUsers);

//get user by id
userRouter.get("/:id", findUserById, userCntrl.getUserById);

//---- change user
userRouter.put("/:id", findUserById, userCntrl.changeUser);

//create user
userRouter.post("/", userCntrl.createUser);

module.exports = userRouter;
