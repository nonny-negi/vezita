const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId, //
    ref: "User",
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    maxLength: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  docter: {
    type: mongoose.Types.ObjectId,
    ref: "Docter",
  },
});

module.exports = mongoose.model("Review", reviewSchema);
