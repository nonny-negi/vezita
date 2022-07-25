const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  docter: {
    type: mongoose.Types.ObjectId,
    ref: "Docter",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
