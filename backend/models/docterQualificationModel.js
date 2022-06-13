const mongoose = require("mongoose");

const docterQualificationSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: true, //
    unique: true,
  },
  institute: {
    type: String,
    required:true
  },
  year: {
    type: Date,
  },
  experience: {
    type: Number,
  },
  status: {
    type: Boolean,
    default: false,
  },
  docter: {
    type: mongoose.Types.ObjectId,
    ref: "Docter",
    required:true
  },
});

module.exports = mongoose.model(
  "DocterQualification",
  docterQualificationSchema
);
