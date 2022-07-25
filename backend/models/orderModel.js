const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Types.ObjectId,
    ref: "Booking",
  },
  amount: {
    type: Number,
  },
  transactionId: {
    type: String,
  },
  docterId: {
    type: mongoose.Types.ObjectId,
    ref: "Docter",
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  bookingType: {
    type: String, //
    enum: ["online", "clinic"],
  },
  status: {
    type: String,
    enum: ["success", "refunded"],
    default: "success",
  },
});

module.exports = mongoose.model("Order", orderSchema);
