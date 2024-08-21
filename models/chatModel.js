const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const chatSchema = new Schema(
  {
    title: {
      type: String,

      required: [true, "Required"],
    },
    participants: {
      type: Schema.Types.ObjectId,
      ref: "User", // Ссылка на коллекцию Users
      required: true,
    },
    messages: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  { versionKey: false, timestamps: true }
);

const Chat = model("Chat", chatSchema);

module.exports = Chat;

//  participants: {
//       type: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
//     },
