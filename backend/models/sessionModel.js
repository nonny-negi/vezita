const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  sessionType: {
    type: String,
    enum: ["online", "offline"],
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
  },
});

module.exports = mongoose.model("Session", sessionSchema);
