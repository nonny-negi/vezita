const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  bannerImage: {
    url: {
      type: String,
      required: true,
    },
    public_url: {
      type: String,
      required: true,
    },
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  docter: {
    type: mongoose.Types.ObjectId,
    ref: "Docter",
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  bannerExpire: {
    type: Date,
  },
});

module.exports = mongoose.model("Banner", bannerSchema);
