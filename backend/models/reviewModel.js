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
  status: {
    type: String,
    enum: ["approve", "block", "pending"], //
    default: "pending",
  },
});

module.exports = mongoose.model("Review", reviewSchema);
