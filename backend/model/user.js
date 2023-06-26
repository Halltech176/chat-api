const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "The username is required"],
  },
  password: {
    type: String,
    required: [true, "The password is requried"],
  },
});
