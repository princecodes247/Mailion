const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // REMEMBER TO INCLUDE UNIQUE VALIDATORS
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "active",
    required: false,
  },
  collections: {
    type: Array,
    default: [],
    required: false,
  },
  plan: {
    type: Number,
    default: 0,
    required: true,
  },
  level: {
    type: Number,
    default: 0,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
    required: false,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
