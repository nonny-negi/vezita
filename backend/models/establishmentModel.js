const mongoose = require("mongoose");

const establishmentSchema = mongoose.Schema({
  establishmentName: {
    type: String,
    required: true,
  }, //
  establishmentType: {
    type: String, //
    enum: ["own", "visit"],
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
    maxLength: 10,
  },
  gallary: [
    {
      public_url: String, //
      url: String, //
    },
  ],
  status: {
    type: Boolean, //
    default: false,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  docter: {
    type: mongoose.Types.ObjectId,
    ref: "Docter",
    required: true,
  },
});

module.exports = mongoose.model("Establishment", establishmentSchema);
