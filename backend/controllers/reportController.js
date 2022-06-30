const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const DocterQualification = require("../models/docterQualificationModel");
const Establishment = require("../models/establishmentModel");
const DocterMedicalRegistration = require("../models/docterMedicalRegistrationModel");
const Docter = require("../models/docterModel");
const PatientHealthReport = require("../models/patientHealthReportModel");

//Add Patient Report
exports.addPatientReport = catchAsyncErrors(async (req, res, next) => {
  const patientReport = req.body;

  const data = {
    reportType: patientReport.reportType,
    reportFor: patientReport.reportFor,
    diagonsedFor: patientReport.diagonsedFor,
    report: req.file.key,
    patient: req.body.patient,
  };

  const pr = await PatientHealthReport.create(data);

  res.status(201).json({ msg: "success", report: pr });
});

//Update Patient Report
exports.updatePatientReport = catchAsyncErrors(async (req, res, next) => {
  const data = req.body;
  const file = req.file.key;

  const found = await PatientHealthReport.findOne({ docter: req.params.id });

  if (!found) return next(new ErrorHander("Patient Report not found"));

  const phr = await PatientHealthReport.findOneAndUpdate(
    { patient: req.params.id },
    { ...data, report: file }
  );

  phr.save();

  res.status(200).json({ msg: "Updated Successfully" });
});

//Delete Patient Report
exports.deletePatientReport = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;

  await PatientHealthReport.findOneAndDelete(id);

  res.status(200).json({ msg: "Deleted Successfully" });
});
