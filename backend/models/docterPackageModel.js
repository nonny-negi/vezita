const mongoose = require("mongoose");

const docterPackageSchema = new mongoose.Schema({
  package: {
    type: mongoose.Types.ObjectId,
    ref: "Package",
    required: true,
  },
  docter: {
    type: mongoose.Types.ObjectId,
    ref: "Docter",
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  packageType: {
    type: String,
    enum: ["monthly", "yearly"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expires: {
    type: Date,
  },
});

module.exports = mongoose.model("DocterPackage", docterPackageSchema);
