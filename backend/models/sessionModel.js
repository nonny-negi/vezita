const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  duration: {
    type: Number, //timestamp in seconds
  },
  completedInDuration: {
    type: Number, // timestamp in seconds
  },
  active: {
    type: Boolean,
    default: true,
  },
  sessionType: {
    type: String,
    enum: ["online", "offline"],
  },
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
});

module.exports = mongoose.model("Session", sessionSchema);
