const mongoose = require("mongoose");

const patientHealthReportSchema = new mongoose.Schema({
  reportType: {
    type: String,
  },
  reportFor: {
    type: String,
  },
  diagonsedFor: {
    type: String,
  },
  report: [
    {
      public_id: { type: String, required: true }, //
      url: { type: String, required: true },
    },
  ],
  patient: {
    type: mongoose.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
});

exports.module = mongoose.model(
  "PatientHealthReport",
  patientHealthReportSchema
);
