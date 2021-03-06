const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: [true, "Name must be unique"],
  },
  phone: {
    type: Number,
  },
  email: {
    type: String,
  },
  relation: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  }, //
  dob: {
    type: Date,
  }, //
  martialStatus: {
    type: String,
    enum: ["married", "single"],
  },
  height: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  emergencyNumber: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
  },
  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Patient", patientSchema);
