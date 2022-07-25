const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DoctorService",
    },
    serviceAvailability: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceAvailability",
      required: true,
    },
    bookingType: {
      type: String,
      enum: ["In-clinic", "Video"],
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    doctorLocation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DoctorLocation",
    },
    basePrice: {
      type: Number,
    },
    additionalDiscount: {
      type: Number,
    },
    totalAmount: {
      type: Number,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
    availabilityId: {
      type: String,
      required: true,
    },
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "active", "completed", "cancelled"],
      default: "pending",
    },
    displayMessage1: {
      type: String,
    },
    displayMessage2: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
