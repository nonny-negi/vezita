const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const Prescription = require("../models/prescriptionModel");

exports.addPrescription = catchAsyncErrors(async (req, res) => {
  const { docter, user, patient } = req.body;
  let doctorPrescription = await Prescription.create({
    docter: docter,
    user: user,
    patient: patient,
    drug: req.body.drug,
    instructions: req.body.instructions,
    instruction: req.body.instruction,
    timeAndDosage: [
      {
        time: req.body.time,
        dosage: req.body.time,
      },
    ],
    duration: {
      time: req.body.time,
      dosage: req.body.dosage,
    },
  });

  res.status(200).json({
    status: true,
    doctorPrescription,
  });
});

//get all Prescription for doctor
exports.getAllPrescription = catchAsyncErrors(async (req, res) => {
  const docterId = req.params.docterId;
  const patientId = req.params.patientId;
  let Allprescription = await Prescription.find({
    docter: docterId,
    patient: patientId,
  });

  res.status(200).json({
    status: true,
    Allprescription,
  });
});

//get all Prescription for user
exports.getAllPrescriptions = catchAsyncErrors(async (req, res) => {
  const userId = req.params.userId;
  let Allprescription = await Prescription.find({ user: userId });

  res.status(200).json({
    status: true,
    Allprescription,
  });
});

//get a single prescription
exports.getOnePrescription = catchAsyncErrors(async (req, res) => {
  const patientId = req.params.patientId;
  let getPrescription = await Prescription.findById(patientId).populate(
    "prescription"
  );

  if (!getPrescription) {
    return res.status(404).json({
      status: false,
      msg: "No prescription exits with this Id",
    });
  }

  res.status(200).json({
    status: true,
    getPrescription,
  });
});
