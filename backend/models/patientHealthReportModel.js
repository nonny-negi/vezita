const mongoose = require("mongoose");

const patientHealthReportSchema = new mongoose.Schema({
  reportType: {
    type: String,
  },
  diagonsedFor: {
    type: String,
  },
  report: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  patient: {
    type: mongoose.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
});

module.exports = mongoose.model(
  "PatientHealthReport",
  patientHealthReportSchema
);
