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
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  shareToDocter: [
    {
      status: { type: Boolean },
      docterId: { type: mongoose.Types.ObjectId, ref: "Docter" },
    },
  ],
});

module.exports = mongoose.model(
  "PatientHealthReport",
  patientHealthReportSchema
);
