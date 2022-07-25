const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  docter: {
    type: mongoose.Types.ObjectId,
    ref: "Docter",
  },
  drug: {
    type: String,
  },
  instructions: {
    type: String,
  },
  instruction: {
    type: String,
    enum: ["before_food", "after_food"],
  },
  timeAndDosage: [
    {
      time: {
        type: String,
        enum: ["morning", "evening", "night"],
      },
      dosage: {
        type: Number,
        default: 1,
      },
    },
  ],
  duration: {
    time: {
      type: Number,
      default: 1,
    },
    durationType: {
      type: String,
      enum: ["day", "week", "month"],
    },
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
});

module.exports = mongoose.model("prescription", prescriptionSchema);
