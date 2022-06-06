const mongoose = require("mongoose");

const docterSpecializationSchema = new mongoose.Schema({
  docterId: {
    type: mongoose.Types.ObjectId,
    ref: "Docter",
  },
  specializationId: {
    type: mongoose.Types.ObjectId,
    ref: "Specialization",
  },
});

exports.module = mongoose.model(
  "DocterSpecialization",
  docterSpecializationSchema
);
