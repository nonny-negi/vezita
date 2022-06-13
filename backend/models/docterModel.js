const mongoose = require("mongoose");

const docterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  totalExperiences: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "pending", "inactive"],
    default: "pending",
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Docter", docterSchema);
