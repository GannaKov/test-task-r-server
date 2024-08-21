const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      minlength: [1, "Too Short!"],
      maxlength: [50, "Too Long!"],
      required: [true, "Required"],
    },
    lastName: {
      type: String,
      minlength: [1, "Too Short!"],
      maxlength: [50, "Too Long!"],
      required: [true, "Required"],
    },
  },
  { versionKey: false, timestamps: true }
  //   { collection: "users" }
);

const User = model("User", userSchema);

module.exports = User;

//   email: {
//     type: String,
//     validate: {
//       validator: (value) => {
//         return /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(value);
//       },
//       message: "Must be a valid email!",
//     },
//     required: [true, "Required"],
//   },
