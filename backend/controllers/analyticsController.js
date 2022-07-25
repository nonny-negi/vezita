const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Analytics = require("../models/analyticsModel");
const Order = require("../models/orderModel");

//get a no. of accepted
exports.getTotalaccepted = catchAsyncErrors(async (req, res) => {
  const doctorId = req.params.doctorId;
  let analytic = await Analytics.find({
    doctor: doctorId,
    accepted: { isAccepted: true },
  });
  let totalAccepted = analytic.length;

  res.status(200).json({
    status: true,
    results: totalAccepted,
    analytic,
  });
});

//get a no. of declined
exports.getTotaldeclined = catchAsyncErrors(async (req, res) => {
  const doctorId = req.params.doctorId;
  let analytic = await Analytics.find({
    doctor: doctorId,
    declined: { isDeclined: true },
  });
  let totalDeclined = analytic.length;

  res.status(200).json({
    status: true,
    results: totalDeclined,
    analytic,
  });
});

//get no. appointments per day
exports.getTotalBookingPerDay = catchAsyncErrors(async (req, res) => {
  const date = req.body;
  const doctorId = req.params.doctorId;
  let dated = date;

  let analytic = await Analytics.find({
    doctor: doctorId,
    accepted: { isAccepted: true, date: dated },
  });
  let totalBooking = analytic.length;

  res.status(200).json({
    status: true,
    results: totalBooking,
    analytic,
  });
});

//over all transaction
exports.getTotalTransaction = catchAsyncErrors(async (req, res) => {
  const doctorId = req.params.doctorId;
  let total = await Order.findById(doctorId);

  let totalamount;
  for (const amount of total.amount) {
    totalamount = totalamount + amount;
  }

  res.status(200).json({
    status: true,
    result: totalamount,
  });
});
