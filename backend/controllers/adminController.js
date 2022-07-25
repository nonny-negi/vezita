const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const User = require("../models/userModel");
const Doctor = require("../models/docterModel");
const DocterQualification = require("../models/docterQualificationModel");
const DocterMedicalRegistration = require("../models/docterMedicalRegistrationModel");
const Patient = require("../models/patientModel");

const APIFeatures = require("../utils/apiFeatures");

// Get all users
exports.getAllUser = catchAsyncErrors(async (req, res) => {
  // let users = await User.find({});
  let users;
  let search = req.query.search;
  if (search) {
    let regex = new RegExp([search].join(""), "i");
    users = await User.aggregate([
      {
        $match: {
          $and: [{ name: { $regex: regex } }, { role: "user" }],
        },
      },
    ]);

    return res.status(200).json({
      status: true,
      results: users.length,
      users,
    });
  }

  // users = await User.find({});
  users = new APIFeatures(User.find({ role: "user" }), req.query).filter();
  const doc = await users.query;

  res.status(200).json({
    status: true,
    results: doc.length,
    users: doc,
  });
});

//get all detail for user
exports.getUser = catchAsyncErrors(async (req, res) => {
  let user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json({
      status: false,
      msg: "User not found.",
    });
  }
  res.status(200).json({
    status: true,
    user,
  });
});

//block user
exports.blockUser = catchAsyncErrors(async (req, res) => {
  let user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json({
      status: false,
      msg: "User not found.",
    });
  }
  let updateUser = await User.findByIdAndUpdate(
    req.params.userId,
    { userStatus: req.body.status },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: true,
    msg: "You blocked user",
    user: updateUser,
  });
});

// Get all patient
exports.getAllPatient = catchAsyncErrors(async (req, res, next) => {
  let patients;
  let search = req.query.search;
  if (search) {
    let regex = new RegExp([search].join(""), "i");
    patients = await Patient.aggregate([
      {
        $match: {
          $and: [{ name: { $regex: regex } }],
        },
      },
    ]);

    return res.status(200).json({
      status: true,
      results: patients.length,
      patients,
    });
  }

  patients = new APIFeatures(Patient.find({}), req.query).filter();
  const doc = await patients.query;

  res.status(200).json({
    status: true,
    results: doc.length,
    users: doc,
  });
});

// Get all doctors
exports.getAllDoctor = catchAsyncErrors(async (req, res) => {
  // let doctors = await doctor.find({});

  let doctors;
  let search = req.query.search;
  if (search) {
    let regex = new RegExp([search].join(""), "i");
    doctors = await Doctor.aggregate([
      {
        $match: {
          $or: [{ fullName: { $regex: regex } }],
        },
      },
    ]);

    return res.status(200).json({
      status: true,
      results: doctors.length,
      doctors,
    });
  }

  doctors = new APIFeatures(Doctor.find({}), req.query).filter();
  const doc = await doctors.query;

  res.status(200).json({
    status: true,
    results: doc.length,
    doctors: doc,
  });
});

//get all detail for user
exports.getDoctor = catchAsyncErrors(async (req, res) => {
  let doctor = await Doctor.findById(req.params.doctorId)
    .populate("DocterQualification")
    .populate("DocterMedicalRegistration");
  if (!doctor) {
    return res.status(404).json({
      status: false,
      msg: "doctor not found.",
    });
  }
  res.status(200).json({
    status: true,
    doctor,
  });
});

//block user
exports.blockDoctor = catchAsyncErrors(async (req, res) => {
  let doctor = await Doctor.findById(req.params.doctorId);
  if (!doctor) {
    return res.status(404).json({
      status: false,
      msg: "User not found.",
    });
  }
  let updateUser = await Doctor.findByIdAndUpdate(
    req.params.doctorId,
    { status: req.body.status },
    { new: true }
  );
  res.status(200).json({
    status: true,
    msg: "You blocked doctor",
    doctor: updateUser,
  });
});

//verify qualification certificate
exports.verifyQualiCertificate = catchAsyncErrors(async (req, res) => {
  let verifyQualiCertificate = await DocterQualification.findByIdAndUpdate(
    req.params.qualificationId,
    { status: true },
    { new: true }
  );
  res.status(200).json({
    status: false,
    DocterQualification: verifyQualiCertificate,
  });
});

//verify medicalRegistration certificate
exports.verifyMedicalRegCertificate = catchAsyncErrors(async (req, res) => {
  let verifyMedicalRegCertificate =
    await DocterMedicalRegistration.findByIdAndUpdate(
      req.params.medicalRegistrationId,
      { new: true }
    );
  res.status(200).json({
    status: false,
    DocterMedicalRegistration: verifyMedicalRegCertificate,
  });
});
