const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  currency: {
    type: String,
  },
  packageType: {
    type: String,
    enum: ["monthly", "yearly"],
  },
  packagePrice: {
    type: Number,
    required: true,
  },
  salePrice: {
    type: Number,
  },
  commissionPercentage: {
    type: Number,
    required: true,
  },
  packageBenefits: [{ type: String }],
});

module.exports = mongoose.model("Package", packageSchema);
