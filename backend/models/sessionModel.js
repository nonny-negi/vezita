const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Types.ObjectId,
    ref: "Docter",
  },
  duration: {
    type: Number,
  },
  sessionType: {
    type: String,
    enum: ["in-clinic", "video"],
  },
  workingDays: [
    {
      type: String,
    },
  ],
  advanceBookingHour: {
    type: Number,
    default: 36,
  },
  consultationFee: { type: Number },
});

module.exports = mongoose.model("Session", sessionSchema);
