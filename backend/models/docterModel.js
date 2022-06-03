const mongoose = require("mongoose");

const docterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fullName: {
    type: String,
    required: true,
  },
  gender: { type: String, required: true },
  bio: { type: String, required: true },
  totalExperiences: { type: String, required: true },
});

exports.module = mongoose.model("Docter", docterSchema);
