const mongoose = require("mongoose");

const establishmentSchema = mongoose.Schema({
  establishmentName: {
    type: String,
    required: true,
  }, //
  type: {
    type: String, //
    enum: [],
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
  docter: {
    type: mongoose.Types.ObjectId,
    ref: "Docter",
    required: true,
  },
});

exports.module = mongoose.model("Establishment", establishmentSchema);
