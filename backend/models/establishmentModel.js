const mongoose = require("mongoose");

const establishmentSchema = mongoose.Schema({
  establishmentName: {
    type: String,
    required: true,
  }, //
  type: {
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
  docter: {
    type: mongoose.Types.ObjectId,
    ref: "Docter",
    required: true,
  },
});

module.exports = mongoose.model("Establishment", establishmentSchema);
