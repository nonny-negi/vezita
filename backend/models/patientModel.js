const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: { type: Number },
  email: { type: String },
  relation: { type: String },
  gender: { type: String }, //
  dob: { type: Date }, //
  martialStatus: { type: String },
  height: { type: Number },
  weight: { type: Number },
  emergencyNumber: { type: Number },
  location: { type: String },
  avatar: {
    public_id: { type: String },
    url: { type: String },
  },
});

exports.module = mongoose.model("Patient", patientSchema);
