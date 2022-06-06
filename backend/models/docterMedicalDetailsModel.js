const mongoose = require("mongoose");

const docterMedicalDetailSchema = new mongoose.Schema({});

exports.module = mongoose.model(
  "DocterMedicalDetail",
  docterMedicalDetailSchema
);
