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
  reviews: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Review",
    },
  ],
  numOfReviews: {
    type: Number,
    default: 0,
  },
  totalRatings: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
},
{
  timestamps:true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
}
);

vendorUserSchema.virtual('DocterMedicalRegistration', {
  ref: 'DocterMedicalRegistration',
  localField: '_id',
  foreignField: 'docter'
});

vendorUserSchema.virtual('DocterQualification', {
  ref: 'DocterQualification',
  localField: '_id',
  foreignField: 'docter'
});

module.exports = mongoose.model("Docter", docterSchema);
