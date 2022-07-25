const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const Order = require("../models/orderModel");

exports.getEarningByDocter = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.aggregate([
    { $match: { docter: req.docter._id } },
    { $group: { _id: null, amount: { $sum: "$amount" } } },
  ]);
  res.status(200).json({ success: true, orders });
});

exports.earningOfDoctorsForAdmin = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.aggregate([
    {
      $group: {
        _id: "$docterId",
        totalEarning: { $sum: "$amount" },
      },
    },
  ]);

  res.status(200).json({ success: true, orders });
});

exports.addBankAccount = catchAsyncErrors(async(req,res,next)=>{})

exports.requestWithdraw = catchAsyncErrors(async (req, res, next) => {});
