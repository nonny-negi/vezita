const mongoose = require("mongoose");

const docterConsultationReportSchema = new mongoose.Schema({});

module.exports = mongoose.model(
  "DocterConsultationReport",
  docterConsultationReportSchema
);
