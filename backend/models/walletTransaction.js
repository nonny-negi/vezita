const mongoose = require("mongoose");

const walletTransactionSchema = new mongoose.Schema({
  walletId: {
    type: mongoose.Types.ObjectId,
    ref: "UserWallet",
  },
  points: {
    type: Number,
  },
  for: {
    type: String,
  },
});

module.exports = mongoose.model("WalletTransaction", walletTransactionSchema);
