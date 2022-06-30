const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const Patient = require("../models/patientModel");
const PatientMedical = require("../models/patientHealthDetailModel");

//add-Patient-Personal Details
exports.addPatient = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  let addPatient = await Patient.create({
    user: user._id,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    relation: req.body.relation,
    gender: req.body.gender,
    dob: req.body.dob,
    martialStatus: req.body.martialStatus,
    hieght: req.body.hieght,
    weight: req.body.weight,
    emergencyNumber: req.body.emergencyNumber,
    location: req.body.location,
    avathar: req.body.avathar,
    address: req.body.address,
    zipcode: req.body.zipcode,
  });

  res.status(200).json({
    status: true,
    patient: addPatient,
  });
});

//add-Patient-Medical Details
exports.addPatientMedical = catchAsyncErrors(async (req, res, next) => {
  let addPatientMedical = await PatientMedical.create({
    patient: mongoose.Types.ObjectId(req.body.patientId),
    bloodGroup: req.body.bloodGroup,
    allergies: req.body.allergies,
    medications: req.body.medications,
    pastMedications: req.body.pastMedications,
    chronicDisease: req.body.chronicDisease,
    injuries: req.body.injuries,
    surgeries: req.body.surgeries,
  });

  res.status(200).json({
    status: true,
    patient: addPatientMedical,
  });
});

//update-patient
exports.updatePatient = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  let patientId = req.params.patientId;

  let patient = await Patient.findById(patientId);
  if (!patient) {
    return res.status(404).json({
      status: false,
      msg: "No patient found with this patient Id",
    });
  }
  if (JSON.stringify(user._id) !== JSON.stringify(patient.user)) {
    return res.status(400).json({
      status: false,
      mag: "You don't have permission to edit patient.",
    });
  }

  if (req.body.default) {
    let allPatiets = await Patient.updateMany(
      { user: patient.user },
      { $set: { default: false } }
    );
  }

  let updatePatient = await Patient.findByIdAndUpdate(patientId, req.body, {
    new: true,
  });

  res.status(200).json({
    status: true,
    patient: updatePatient,
  });
});

//get single patient
exports.getSinglePatient = catchAsyncErrors(async (req, res, next) => {
  let patientId = req.params.patientId;

  let patient = await Patient.findById(patientId);
  if (!patient) {
    return res.status(404).json({
      status: false,
      msg: "No patient found with this patient Id",
    });
  }
  res.status(200).json({
    status: true,
    patient,
  });
});

//Get User patient
exports.getUserPatients = catchAsyncErrors(async (req, res, next) => {
  let patient = await Patient.findById({ user: req.user._id });
  if (!patient) {
    return res.status(404).json({
      status: false,
      msg: "No patient found",
    });
  }
  res.status(200).json({
    status: true,
    patient,
  });
});

