const mongoose = require("mongoose");

const userWalletSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("UserWallet", userWalletSchema);
