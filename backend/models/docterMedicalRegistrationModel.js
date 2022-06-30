const mongoose = require("mongoose");

const docterMedicalRegistrationSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  councilName: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  docter: {
    type: mongoose.Types.ObjectId,
    ref: "Docter",
    required: true,
  },
},
  {timestamps:true}
);

module.exports = mongoose.model(
  "DocterMedicalRegistration",
  docterMedicalRegistrationSchema
);
