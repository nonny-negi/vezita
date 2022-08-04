const mongoose = require("mongoose");

const docterServiceSchema = new mongoose.Schema({
  docter: {
    type: mongoose.Types.ObjectId,
    ref: "Docter",
  },
  serviceId: {
    type: mongoose.Types.ObjectId,
    ref: "Specialization",
  },
});

module.exports = mongoose.model("DocterService", docterServiceSchema);
