const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userTemporarySchema = new Schema(
  {
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
    referralCode: {
      type: String,
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
