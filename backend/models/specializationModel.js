const mongoose = require("mongoose");

const specializationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
  },
  icon: {
    url: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/2317/2317929.png",
    },
  },
});

module.exports = mongoose.model("Specialization", specializationSchema);
