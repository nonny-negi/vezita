const mongoose = require("mongoose");

const docterServicesSchema = new mongoose.Schema({
  docterId: {
    type: mongoose.Types.ObjectId,
    ref: "Docter",
  },
  serviceId: {
    type: mongoose.Types.ObjectId,
    ref: "Service",
  },
});

exports.module = mongoose.model("DocterSpecialization", docterServicesSchema);
