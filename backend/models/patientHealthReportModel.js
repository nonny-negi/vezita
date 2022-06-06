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
});

exports.module = mongoose.model(
  "PatientHealthReport",
  patientHealthReportSchema
);
