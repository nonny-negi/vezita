const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const Specialization = require("../models/specializationModel");
const DocterSpecialization = require("../models/docterSpecializationModel");

exports.addSpecialization = catchAsyncErrors(async (req, res, next) => {
  const { name: specialization } = req.body;

  const sp = await Specialization.findOne({ name: specialization });

  if (sp)
    return next(new ErrorHander(`${specialization} is already registered`));

  await Specialization.create({ name: specialization });
  res.status(201).json({ msg: "success" });
});

exports.updateSpecialization = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const specialization = await Specialization.findById(id);
  if (!specialization) return next(new ErrorHander("Not Found", 404));
  specialization.name = req.body.name;
  specialization.save();
  res.status(200).json({ msg: "success" });
});

exports.deleteSpecialization = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  await Specialization.findByIdAndDelete(id);
  res.status(200).json({ msg: "success" });
});

exports.getAllSpecialization = catchAsyncErrors(async (req, res, next) => {
  const specialization = await Specialization.aggregate([
    {
      $project: {
        specialization: "$name",
        icon: "$icon.url",
        _id: 0,
        id:"$_id"
      },
    },
  ]);

  res.status(200).json(specialization);
});

exports.addDocterSpecialization = catchAsyncErrors(async (req, res, next) => {
  const { specializationIds } = req.body;
  specializationIds.forEach(async (id) => {
    await DocterSpecialization.create({
      specializationId: id,
      docter: req.docter,
    });
  });
  res.status(201).json({ msg: "success" });
});

// exports.addServices = catchAsyncErrors(async(req,res))
