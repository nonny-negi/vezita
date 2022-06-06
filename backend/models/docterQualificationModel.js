const mongoose = require("mongoose");

const docterQualificationSchema = new mongoose.Schema({
  degree: {
    type: String,
  },
  institute: {
    type: String,
  },
  year: {
    type: Date,
  },
  experience: {
    type: Number,
  },
  docterId: {
    type: mongoose.Types.ObjectId,
    ref: "Docter",
  },
});

module.exports = mongoose.model(
  "DocterQualification",
  docterQualificationSchema
);
