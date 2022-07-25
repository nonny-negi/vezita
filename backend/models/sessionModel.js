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
    enum: ["online", "offline"],
  },
  workingDays: [{ type: String }],
  advanceBookingHour: { type: Number },
  slot: [
    {
      startTime: {
        type: Date,
      },
      endTime: {
        type: Date,
      },
    },
  ],
});

module.exports = mongoose.model("Session", sessionSchema);
