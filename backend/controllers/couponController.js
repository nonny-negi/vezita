const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const Coupon = require("../models/couponModel");

exports.addCoupon = catchAsyncErrors(async (req, res, next) => {
  const newCoupon = await Coupon.create(req.body);
  res.status(201).json({ msg: "Coupon Added Successfully" });
});

exports.getAllCoupons = catchAsyncErrors(async (req, res, next) => {
  const coupons = await Coupon.find({}).sort({ _id: -1 });
  res.status(200).json(coupons);
});

exports.getCouponById = catchAsyncErrors(async (req, res, next) => {
  const coupon = await Coupon.findById(req.params.id);

  res.status(200).send(coupon);
});

exports.deleteCoupon = catchAsyncErrors(async (req, res, next) => {
  await Coupon.deleteOne({ _id: req.params.id });

  res.status(200).json({ msg: "Coupon Deleted Successfully" });
});
