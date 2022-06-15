const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const DocterQualification = require("../models/docterQualificationModel");
const Establishment = require("../models/establishmentModel");
const DocterMedicalRegistration = require("../models/docterMedicalRegistrationModel");
const Docter = require("../models/docterModel");

exports.addDocument = catchAsyncErrors(async (req, res, next) => {});
