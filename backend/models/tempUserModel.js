const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userTemporarySchema = new Schema(
  {
    name: {
      type: String,
    },
    avatar: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    emailOtp: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    uid: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "UserTemporary",
  userTemporarySchema,
  "UserTemporary"
);
