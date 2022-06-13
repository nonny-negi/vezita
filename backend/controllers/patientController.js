const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.addPatient = catchAsyncErrors(async (req, res, next) => {});
