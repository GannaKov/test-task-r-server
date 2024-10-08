const express = require("express");

const userRouter = require("./routes/userRoutes");
const chatRouter = require("./routes/chatRoutes");
const messageRouter = require("./routes/messageRoutes");

require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //!!!

app.use("/api/users", userRouter);
app.use("/api/chats", chatRouter);
app.use("/api/message", messageRouter);

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send(err.message);
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server Error " } = err;

  res.status(status).json({ message });
});

module.exports = app;
