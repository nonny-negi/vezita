const mongoose = require("mongoose");

const doctorCertSchema = mongoose.Schema({
  certificateType: {
    type: String, //
    required: [true, "Specify Certificate type"],
  },

  certificateAvailDate: {
    type: Date,
    required: [true, "Certificate Date is required"],
  },

  certificateNumber: {
    type: Number,
    required: [true, "Certificate Number is required"],
  },

  certificate: {
    url: {
      type: String,
      required: [true, "Certificate URL is required"],
    },
    public_id: {
      type: String,
      required: [true, "Public ID is required"],
    },
  },
});

module.exports = mongoose.model("DoctorCert", doctorCertSchema);
