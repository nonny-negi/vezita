const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const DocterQualification = require("../models/docterQualificationModel");
const Establishment = require("../models/establishmentModel");
const DocterMedicalRegistration = require("../models/docterMedicalRegistrationModel");
const Docter = require("../models/docterModel");
const DocterExperience = require("../models/docterExperienceModel");
const DocterSpecialization = require("../models/docterSpecializationModel");

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

//user customer
exports.getAllDocterForCustormers = catchAsyncErrors(async (req, res, next) => {
  const docters = await Docter.aggregate([
    {
      $lookup: {
        from: "establishments",
        localField: "_id",
        foreignField: "docter",
        pipeline: [
          
          {
            $project: {
              _id: 0,
              establishmentName: 1,
              city: 1,
            },
          },
        ],
        as: "establishment",
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
          // {
          //   $group: {
          //     _id: null,
          //     name: { $push: "$sp.name" },
          //   },
          // },
          {
            $project: {
              name: "$sp.name",

              _id: 0,
            },
          },
        ],
        as: "specialization",
      },
    },
    // {
    //   $unwind: "$specialization",
    // },
    {
      $project:{
        reviews:0,
        user:0,
        __v:0,
      
      }
    }
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
        from: "docterexperiences",
        localField: "_id",
        foreignField: "docter",
        as: "docter-experience-details",
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
              d,
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
    await DocterQualification.create({ ...item, docter: req.docter._id });
  });
  res.status(201).json({ msg: "success" });
});

//Update Education
exports.updateEducation = catchAsyncErrors(async (req, res, next) => {
  const data = req.body;

  await DocterQualification.findOneAndUpdate(
    { docter: req.docter._id },
    { $set: data }
  );

  res.status(200).json({ msg: "Updated Successfully" });
});

//Add Establishment
exports.addEstablishment = catchAsyncErrors(async (req, res, next) => {
  const establishment = {
    establishmentName: req.body.establishmentName, //
    establishmentType: req.body.establishmentType, //
    contactNumber: req.body.contactNumber, //
    address: req.body.address, //
    city: req.body.city,
  };

  const isChecked = await Establishment.find({
    $and: [
      { _id: req.docter._id },
      { establishmentName: req.body.establishmentName },
    ],
  });

  if (isChecked.length > 0)
    return next(new ErrorHander("Establishment already exist !", 409));

  const establishmentDetails = await Establishment.create({
    ...establishment,
    docter: req.docter._id,
  });

  res.status(201).json({ msg: "success", establishmentDetails });
});

//Update Establishment
exports.updateEstablishment = catchAsyncErrors(async (req, res, next) => {
  const data = req.body;

  const e = await Establishment.findOneAndUpdate(
    { docter: req.docter._id },
    { ...data }
  );
  e.save();
  res.status(200).json({ msg: "Updated Successfully" });
});

//Add Medical Details
exports.addDocterMedicalRegistrationDetails = catchAsyncErrors(
  async (req, res, next) => {
    const data = {
      registrationNumber: req.body.registrationNumber,
      councilName: req.body.councilName,
      year: req.body.year,
      docter: req.docter._id,
    };

    await DocterMedicalRegistration.create(data);

    res.status(201).json({ msg: "success" });
  }
);

//Update Medical Details
exports.updateDocterMedicalRegistrationdetails = catchAsyncErrors(
  async (req, res, next) => {
    const data = req.body;
    const dmr = await DocterMedicalRegistration.findOneAndUpdate(
      { docter: req.docter._id },
      { ...data }
    );

    dmr.save();
    res.status(200).json({ msg: "Update Successfully" });
  }
);

//Add Docter Experience
exports.addDocterExperience = catchAsyncErrors(async (req, res, next) => {
  const data = {
    start: req.body.start,
    end: req.body.end,
    role: req.body.role,
    city: req.body.city,
    establishmentName: req.body.establishmentName,
    docter: req.docter._id,
  };

  const de = await DocterExperience.create(data);

  res.status(201).json({ msg: "success", data: de });
});

//Update Docter Experience
exports.updateDocterExperience = catchAsyncErrors(async (req, res, next) => {
  const newData = req.body;

  const de = await DocterExperience.findOneAndUpdate(
    { _id: req.params.id },
    { ...newData }
  );

  de.save();

  res.status(200).json({ msg: "Updated Successfully" });
});

//Delete Docter Experience
exports.deleteDocterExperience = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params.id;

  await DocterExperience.findByIdAndDelete(id);

  res.status(200).json({ msg: "Deleted Successfully" });
});

//Get Docter Experience Me
exports.getDocterExperience = catchAsyncErrors(async (req, res, next) => {
  const data = await DocterExperience.find({ docter: req.docter._id });
  res.status(200).json({ success: true, data });
});

//Get Docter's by specialization
exports.getDocterBySpecialization = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const results = await Docter.aggregate([
    {
      $lookup: {
        from: "docterspecializations",
        localField: "_id",
        foreignField: "docter",
        as: "result",
      },
    },
    {
      $unwind: "$result",
    },
    {
      $project: {
        docters: "$result.docter",
        id: "$result.specializationId",
        _id: 0,
      },
    },
  ]);

  res.status(200).json({ success: true, results });
});
