const mongoose = require("mongoose");

const patientHealthDetailSchema = new mongoose.Schema({
  bloodGroup: {
    type: String,
  },
  allergies: [
    {
      type: String,
    },
  ],
  medications: [
    {
      type: String,
    },
  ],
  pastMedications: [
    {
      type: String,
    },
  ], //
  chronicDisease: [
    {
      type: String,
    },
  ],
  injuries: [
    {
      type: String,
    },
  ], //
  surgeries: [
    {
      type: String,
    },
  ],
  patient: {
    type: mongoose.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  report: [
    {
      type: mongoose.Types.ObjectId,
      ref: "PatientHealthReport",
    },
  ],
});

exports.module = mongoose.model(
  "PatientHealthDetail",
  patientHealthDetailSchema
);
