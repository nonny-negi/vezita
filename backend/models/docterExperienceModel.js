const mongoose = require("mongoose");

const docterExperienceSchema = new mongoose.Schema({
  start: {
    month: {
      type: String,
      enum: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      required: true,
    },
    year: {
      type: Number, //
      required: true,
    },
  },
  end: {
    month: {
      type: String,
      enum: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      required: true,
    },
    year: {
      type: Number, //
      required: true,
    },
  },
  role: {
    type: String, //
    required: true,
  },
  city: {
    type: String, //
    required: true,
  },
  establishmentName: {
    type: String, //
    required: true,
  },
  docter: {
    type: mongoose.Types.ObjectId,
    ref: "Docter",
    required: true,
  },
});

module.exports = mongoose.model("DocterExperience", docterExperienceSchema);
