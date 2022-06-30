const mongoose = require("mongoose");

const bookingTransactionSchema = new mongoose.Schema({
  docter: {
    type: mongoose.Types.ObjectId, //
    ref: "Docter",
  },
  patient: {
    type: mongoose.Types.ObjectId,
    ref: "Patient",
  },
  transactionId: {
    type: String,
  },
  clientSecret: {
    type: String,
  },
  amountPaid: {
    type: Number,
  },
  transactionTime: { type: Date },
});

module.exports = mongoose.model("BookingTransaction", bookingTransactionSchema);
