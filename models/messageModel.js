const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const messageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Required"],
    },
    text: {
      type: String,

      required: [true, "Required"],
    },
    chatId: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: [true, "Required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const Message = model("Message", messageSchema);

module.exports = Message;
