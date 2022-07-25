const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const DocterQualification = require("../models/docterQualificationModel");
const Establishment = require("../models/establishmentModel");
const DocterMedicalRegistration = require("../models/docterMedicalRegistrationModel");
const Docter = require("../models/docterModel");
const PatientHealthReport = require("../models/patientHealthReportModel");
const Prescription = require("../models/prescriptionModel");

const DocterCert = require("../models/docterCertModel");

const mongoose = require("mongoose");

//Add Patient Report
exports.addPatientReport = catchAsyncErrors(async (req, res, next) => {
  const patientReport = req.body;

  const data = {
    reportType: patientReport.reportType,
    diagonsedFor: patientReport.diagonsedFor,
    // report: req.file.key,
    patient: req.body.patient,
    user: req.user._id,
  };

  const pr = await PatientHealthReport.create(data);

  res.status(201).json({ msg: "success", report: pr });
});

//Update Patient Report
exports.updatePatientReport = catchAsyncErrors(async (req, res, next) => {
  const data = req.body;
  const file = req.file.key;

  const found = await PatientHealthReport.findOne({ id: req.params.id });

  if (!found) return next(new ErrorHander("Patient Report not found"));

  if (req.user_id !== found.user)
    return next(
      new ErrorHander("you don't have a permission to update the report", 400)
    );

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

//get patient report
exports.getPatientReport = catchAsyncErrors(async (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.params.patientId);

  const reports = await PatientHealthReport.find({ patient: id });

  res.status(200).send(reports);
});

exports.getSinglePatientReport = catchAsyncErrors(async (req, res, next) => {
  const result = await PatientHealthReport.aggregate([
    {
      $match: { $and: [{ _id: req.params.id }, { user: req.user._id }] },
    },
    {
      $unwind: "$shareToDocter",
    },
    {
      $lookup: {
        from: "docters",
        localField: "$shareToDocter.docterId",
        foreignField: "_id",
        pipeline: [
          {
            $project: {
              fullName: 1,
              id: "$_id",
              _id: 0,
            },
          },
        ],
        as: "doctor",
      },
    },
  ]);

  res.status(200).json({ success: true, result });
});

//share report to docter
exports.shareReportToDocter = catchAsyncErrors(async (req, res, next) => {
  const { docterId, reportId } = req.params;

  const found = await PatientHealthReport.findOne({
    $and: [{ _id: reportId }, { user: req.user.Id }],
  });

  if (!found) return next(new ErrorHander("Report not found", 404));

  found.shareToDocter.push({ docterId, status: true });

  await found.save();

  res.status(200).json({ message: `share to docter id:${docterId}` });
});

//get patient report for docter
exports.getPatientReportForDocter = catchAsyncErrors(async (req, res, next) => {
  const { patientId } = req.params;

  const report = await PatientHealthReport.findOne({ patient: patientId });

  if (!report)
    return next(new ErrorHander("Invalid Patient Id report not found", 404));

  const found = report.shareToDocter.find(
    (docter) => docter.docterId === req.docter._id
  );

  if (!found)
    return next(
      new ErrorHander(
        "you don't have the permission to access the report of this patient",
        401
      )
    );

  res.status(200).json({ message: success, report });
});

//upload docter certificate file
exports.uploadDoctorCert = catchAsyncErrors(async (req, res, next) => {
  const data = {
    certificateType: req.body.certificateType,
    certificateAvailDate: req.body.certificateAvailDate,
    certificateNumber: req.body.certificateNumber,
    certificate: {
      url: req.file.key,
      public_id: req.file.key,
    },
  };
  const newCert = await DocterCert.create(data);

  res.status(201).json({ success: true, certificate: newCert });
});
