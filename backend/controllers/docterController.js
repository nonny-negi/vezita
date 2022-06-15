const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const DocterQualification = require("../models/docterQualificationModel");
const Establishment = require("../models/establishmentModel");
const DocterMedicalRegistration = require("../models/docterMedicalRegistrationModel");
const Docter = require("../models/docterModel");

const mongoose = require("mongoose");

// New Profile (Docter)
exports.docterProfile = catchAsyncErrors(async (req, res, next) => {
  const { basicDetails, medicalRegistration, educationDetails, establishment } =
    req.body;

  const isDocter = await Docter.findOne({ user: req.user.id });

  if (isDocter) {
    return next(new ErrorHander("docter already isexits", 400));
  }

  const docter = await Docter.create({
    ...basicDetails,
    user: req.user,
  });

  const medicalDetails = await DocterMedicalRegistration.create({
    ...medicalRegistration,
    docter: docter._id,
  });

  const education = await DocterQualification.create({
    ...educationDetails,
    docter: docter._id,
  });

  const establishmentDetails = await Establishment.create({
    ...establishment,
    docter: docter._id,
  });

  res
    .status(201)
    .json({ docter, medicalDetails, establishmentDetails, education });
});

//Admin
exports.getAllDocterProfile = catchAsyncErrors(async (req, res, next) => {
  const docters = await Docter.aggregate([
    {
      $lookup: {
        from: "docterqualifications",
        localField: "_id",
        foreignField: "docter",
        as: "education",
      },
    },
    {
      $lookup: {
        from: "establishments",
        localField: "_id",
        foreignField: "docter",
        as: "establishment",
      },
    },
    {
      $lookup: {
        from: "doctermedicalregistrations",
        localField: "_id",
        foreignField: "docter",
        as: "medical-registration-details",
      },
    },
    {
      $lookup: {
        from: "docterspecializations",
        localField: "_id",
        foreignField: "docter",
        pipeline: [
          {
            $lookup: {
              from: "specializations",
              localField: "specializationId",
              foreignField: "_id",
              as: "sp",
            },
          },
          {
            $unwind: "$sp",
          },
          {
            $project: {
              specialization: "$sp.name",
              icon: "$sp.icon.url",
              _id: 0,
            },
          },
        ],
        as: "specialization",
      },
    },
  ]);
  res.status(200).json({ docters });
});

//My Profile (Docter)
exports.getMyProfile = catchAsyncErrors(async (req, res, next) => {
  const docter = await Docter.aggregate([
    {
      $match: { _id: req.docter._id },
    },
    {
      $lookup: {
        from: "docterqualifications",
        localField: "_id",
        foreignField: "docter",
        as: "education",
      },
    },
    {
      $lookup: {
        from: "establishments",
        localField: "_id",
        foreignField: "docter",
        as: "establishment",
      },
    },
    {
      $lookup: {
        from: "doctermedicalregistrations",
        localField: "_id",
        foreignField: "docter",
        as: "medical-registration-details",
      },
    },
    {
      $lookup: {
        from: "docterspecializations",
        localField: "_id",
        foreignField: "docter",
        pipeline: [
          {
            $lookup: {
              from: "specializations",
              localField: "specializationId",
              foreignField: "_id",
              as: "sp",
            },
          },
          {
            $unwind: "$sp",
          },
          {
            $project: {
              specialization: "$sp.name",
              icon: "$sp.icon.url",
              _id: 0,
            },
          },
        ],
        as: "specialization",
      },
    },
  ]);
  res.status(200).json(docter[0]);
});

//Get Docter's Profile (customer)
exports.getDocterProfileById = catchAsyncErrors(async (req, res, next) => {
  const docter = await Docter.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(req.params.id) },
    },
    {
      $lookup: {
        from: "docterqualifications",
        localField: "_id",
        foreignField: "docter",
        as: "education",
      },
    },
    {
      $lookup: {
        from: "establishments",
        localField: "_id",
        foreignField: "docter",
        as: "establishment",
      },
    },
    {
      $lookup: {
        from: "doctermedicalregistrations",
        localField: "_id",
        foreignField: "docter",
        as: "medical-registration-details",
      },
    },
    {
      $lookup: {
        from: "docterspecializations",
        localField: "_id",
        foreignField: "docter",
        pipeline: [
          {
            $lookup: {
              from: "specializations",
              localField: "specializationId",
              foreignField: "_id",
              as: "sp",
            },
          },
          {
            $unwind: "$sp",
          },
          {
            $project: {
              specialization: "$sp.name",
              icon: "$sp.icon.url",
              _id: 0,
            },
          },
        ],
        as: "specialization",
      },
    },
  ]);
  res.status(200).json(docter[0]);
});

//Add Education (Docter)
exports.addEducation = catchAsyncErrors(async (req, res, next) => {
  const { qualification } = req.body;
  qualification.forEach(async (item) => {
    await DocterQualification.create({ ...item, docter: req.docter });
  });
  res.status(201).json({ msg: "success" });
});

//Add Establishment
exports.addEstablishment = catchAsyncErrors(async (req, res, next) => {});

//Add Medical Details
exports.addDocterMedicalRegistrationDetails = catchAsyncErrors(
  async (req, res, next) => {}
);
