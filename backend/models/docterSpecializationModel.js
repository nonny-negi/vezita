const mongoose = require("mongoose");

const docterSpecializationSchema = new mongoose.Schema({
  docter: {
    type: mongoose.Types.ObjectId,
    ref: "Docter",
  },
  specializationId: {
    type: mongoose.Types.ObjectId,
    ref: "Specialization",
  },
});

module.exports = mongoose.model(
  "DocterSpecialization",
  docterSpecializationSchema
);
