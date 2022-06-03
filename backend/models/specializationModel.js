const mongoose = require("mongoose");

const specializationSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
});

exports.module = mongoose.model("Specialization", specializationSchema);
