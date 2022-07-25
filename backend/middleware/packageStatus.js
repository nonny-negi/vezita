const DocterPackage = require("../models/docterPackageModel");

exports.checkPackageStatus = () => {
  return async (req, res, next) => {
    const package = await DocterPackage.findOne({
      $and: [{ docter: req.docter._id }, { status: "active" }],
    });

    if (!package) req.packageStatus = "No Active Package";

    req.packageStatus = package;

    next();
  };
};
