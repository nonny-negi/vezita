const ErrorHandler = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const mongoose = require("mongoose");
const Package = require("../models/packageModel");

const DocterPackage = require("../models/docterPackageModel");

exports.newPackage = catchAsyncErrors(async (req, res, next) => {
  const data = {
    currency: req.body.currency,
    packageType: req.body.packageType,
    packagePrice: req.body.packagePrice,
    salePrice: req.body.salePrice,
    packageBenefits: req.body.benefits,
  };

  const package = await Package.create(data);

  res.status(201).json({ success: true, package });
});

exports.getAllPackages = catchAsyncErrors(async (req, res, next) => {
  const packages = await Package.find({});

  res.status(200).json({ success: true, packages });
});

exports.updatePackage = catchAsyncErrors(async (req, res, next) => {
  const data = req.body;

  const package = await Package.updateOne(
    { _id: req.params.id },
    { $set: { ...data } }
  );

  res.status(200).json({ msg: "Updated Successfully", package });
});

exports.deletePackage = catchAsyncErrors(async (req, res, next) => {
  const associatedPackages = await DocterPackage.find({
    package: mongoose.Types.ObjectId(req.params.id),
  });

  if (associatedPackages?.length)
    return next(
      new ErrorHandler(
        "You cannot delete this package as it is subscribe by users",
        400
      )
    );

  await Package.deleteOne({ package: mongoose.Types.ObjectId(req.params.id) });

  res.status(200).json({ success: true });
});

exports.selectPackageByDocter = catchAsyncErrors(async (req, res, next) => {
  const packageId = req.body.packageId;

  const package = await Package.findById(mongoose.Types.ObjectId(packageId));

  if (!package) return next(new ErrorHandler("Package Not Found !", 404));

  const runningPackage = await DocterPackage.findOne({
    $and: [{ docter: req.docter._id }, { status: "active" }],
  });

  if (runningPackage)
    return next(new ErrorHandler("You have a running Package", 400));

  const docterPackage = await DocterPackage.create({
    package: mongoose.Types.ObjectId(packageId),
    docter: req.docter._id,
    packageType: package.packageType,
    status: "active",
  });

  res.status(201).json({ success: true, docterPackage });
});

exports.getActivePackageDocter = catchAsyncErrors(async (req, res, next) => {
  const activePackage = await DocterPackage.findOne({
    $and: [{ docter: req.docter._id }, { status: "active" }],
  }).populate("package");

  if (!activePackage)
    return next(new ErrorHandler("No Active Package Found !", 404));

  res.status(200).json({ activePackage, success: true });
});

exports.getAllDocterPackages = catchAsyncErrors(async (req, res, next) => {
  const packages = await DocterPackage.find({
    docter: req.docter._id,
  }).populate("package");

  if (!packages) return next(new ErrorHandler("Packages Not Found !", 404));

  res.status(200).json({ success: true, packages });
});
