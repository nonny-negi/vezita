const ErrorHandler = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const Banner = require("../models/bannerModel");

exports.uploadBanner = catchAsyncErrors(async (req, res, next) => {
  const data = {
    docter: req.body.docter._id,
    bannerImage: {
      url: req.file.key,
      public_id: req.file.key,
    },
    discountPercentage: req.body.discountPercentage,
    bannerExpire: req.body.date,
  };

  const newBanner = await Banner.create(data);

  res
    .status(201)
    .json({
      msg: "submitted ! it will be reflect after admin approve",
      newBanner,
    });
});


exports.updateStatus = catchAsyncErrors(async (req,res,next)=>{
    
})