const mongoose = require("mongoose");

const docterSlotSchema = new mongoose.Schema({
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
  doctorId: {
    type: mongoose.Types.ObjectId,
    ref: "Docter",
  },
  sessionId: {
    type: mongoose.Types.ObjectId,
    ref: "Session",
  },
});

module.exports = mongoose.model("DocterSlot", docterSlotSchema);
