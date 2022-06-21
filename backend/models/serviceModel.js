const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Service Name"],
    unique: true,
  },
  icon: {
    url: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/2317/2317929.png",
    },
  },
  specialization: {
    type: mongoose.Types.ObjectId,
    ref: "Specialization",
    required: true,
  },
});

module.exports = mongoose.model("Service", serviceSchema);
