const mongoose = require("mongoose");

const specializationSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
});

module.exports = mongoose.model("Specialization", specializationSchema);
