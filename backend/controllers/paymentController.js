const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const ErrorHandler = require("../utils/errorhander");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const Order = require("../models/orderModel");

const mongoose = require("mongoose");


exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: req.body.currency,
    metadata: {
      company: "Vezita",
    },
  });

  res
    .status(200)
    .json({ msg: "success", client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_SECRET_KEY });
});

exports.createOrder = catchAsyncErrors(async (req, res, next) => {
  const data = {
    bookingId: req.body.bookingId,
    amount: req.body.amount,
    transactionId: req.body.transactionId,
    bookingType: req.body.bookingType,
    docterId: req.body.docterId,
    userId: req.body.userId,
  };

  const order = await Order.create(data);

  res.status(201).json({ success: true, order });
});

//Order for customer app
exports.ordersForUser = catchAsyncErrors(async (req, res, next) => {
  const myOrders = await Order.aggregate([
    {
      $match: { userId: req.user._id },
    },
    {
      $lookup: {
        from: "docters",
        localField: "docterId",
        foreignField: "_id",
        ad: "consultingDocter",
      },
    },
    {
      $unwind: "$consultingDocter",
    },
  ]);

  if (!myOrders) return next(new ErrorHandler("Order Not Found", 404));

  res.status(200).send(myOrders);
});

exports.ordersForDoctor = catchAsyncErrors(async (req, res, next) => {
  const myOrders = await Order.find({ docterId: req.docter._id });

  if (!myOrders) return next(new ErrorHandler("Order Not Found", 404));

  res.status(200).send(myOrders);
});

exports.orderDetailsForDocter = catchAsyncErrors(async (req, res, next) => {
  const orderDetail = await Order.aggregate([
    {
      $match: {
        $and: [
          { _id: mongoose.Types.ObjectId(req.params.id) },
          { docterId: req.docter._id },
        ],
      },
    },
    {
      $unwind: "$orders",
    },
    {
      $lookup: {
        from: "bookings",
        localField: "bookingId",
        foreignField: "_id",
        pipeline: [
          {
            $lookup: {
              from: "patients",
              localField: "patientId",
              foreignField: "_id",
              as: "patientDetails",
            },
          },
          {
            $unwind: "$patientDetails",
          },
          {
            $lookup: {
              from: "sessions",
              localField: "sessionId",
              foreignField: "_id",
              as: "sessionDetails",
            },
          },
          {
            $unwind: "$sessionDetails",
          },
          {
            $lookup: {
              from: "",
              localField: "",
              foreignField: "",
              as: "serviceDetails",
            },
          },
          {
            $unwind: "$serviceDetails",
          },
        ],
        as: "bookingDetails",
      },
    },
    {
      $unwind: "bookingDetails",
    },
    {
      $lookup: {
        from: "docters",
        localField: "docterId",
        foreignField: "_id",
        as: "docterDetails",
      },
    },
    {
      $unwind: "$docterDetails",
    },
    {
      $project: {
        patient: "$bookingDetails.patientDetails",
        service: "bookingDetails.serviceDetails", //
        session: "$bookingDetails.sessionDetails", //
        docter: "$docterDetails",
        amount: 1,
        _id: 0,
      },
    },
  ]);

  if (!orderDetail)
    return next(new ErrorHandler("Order details not found !", 404));

  res.status(200).json({ success: true, orderDetail });
});

exports.orderDetailsForUser = catchAsyncErrors(async (req, res, next) => {
  const orderDetail = await Order.aggregate([
    {
      $match: {
        $and: [
          { _id: mongoose.Types.ObjectId(req.params.id) },
          { userId: req.user._id },
        ],
      },
    },
    {
      $unwind: "$orders",
    },
    {
      $lookup: {
        from: "bookings",
        localField: "bookingId",
        foreignField: "_id",
        pipeline: [
          {
            $lookup: {
              from: "patients",
              localField: "patientId",
              foreignField: "_id",
              as: "patientDetails",
            },
          },
          {
            $unwind: "$patientDetails",
          },
          {
            $lookup: {
              from: "sessions",
              localField: "sessionId",
              foreignField: "_id",
              as: "sessionDetails",
            },
          },
          {
            $unwind: "$sessionDetails",
          },
          {
            $lookup: {
              from: "",
              localField: "",
              foreignField: "",
              as: "serviceDetails",
            },
          },
          {
            $unwind: "$serviceDetails",
          },
        ],
        as: "bookingDetails",
      },
    },
    {
      $unwind: "bookingDetails",
    },
    {
      $lookup: {
        from: "docters",
        localField: "docterId",
        foreignField: "_id",
        as: "docterDetails",
      },
    },
    {
      $unwind: "$docterDetails",
    },
    {
      $project: {
        patient: "$bookingDetails.patientDetails",
        service: "bookingDetails.serviceDetails", //
        session: "$bookingDetails.sessionDetails", //
        docter: "$docterDetails",
        amount: 1,
        _id: 0,
      },
    },
  ]);

  if (!orderDetail)
    return next(new ErrorHandler("Order details not found !", 404));

  res.status(200).json({ success: true, orderDetail });
});

exports.orderForAdmin = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({});

  res.status(200).json({ success: true, orders });
});

exports.orderDetailsForAdmin = catchAsyncErrors(async (req, res, next) => {
  const orderDetail = await Order.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.params.id),
      },
    },
    {
      $unwind: "$orders",
    },
    {
      $lookup: {
        from: "bookings",
        localField: "bookingId",
        foreignField: "_id",
        pipeline: [
          {
            $lookup: {
              from: "patients",
              localField: "patientId",
              foreignField: "_id",
              as: "patientDetails",
            },
          },
          {
            $unwind: "$patientDetails",
          },
          {
            $lookup: {
              from: "sessions",
              localField: "sessionId",
              foreignField: "_id",
              as: "sessionDetails",
            },
          },
          {
            $unwind: "$sessionDetails",
          },
          {
            $lookup: {
              from: "",
              localField: "",
              foreignField: "",
              as: "serviceDetails",
            },
          },
          {
            $unwind: "$serviceDetails",
          },
        ],
        as: "bookingDetails",
      },
    },
    {
      $unwind: "bookingDetails",
    },
    {
      $lookup: {
        from: "docters",
        localField: "docterId",
        foreignField: "_id",
        as: "docterDetails",
      },
    },
    {
      $unwind: "$docterDetails",
    },
    {
      $lookup: {
        from: "userId",
        localField: "userId",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    { $unwind: "$userDetails" },
    {
      $project: {
        patient: "$bookingDetails.patientDetails",
        service: "bookingDetails.serviceDetails", //
        session: "$bookingDetails.sessionDetails", //
        docter: "$docterDetails",
        amount: 1,
        _id: 0,
      },
    },
  ]);

  if (!orderDetail)
    return next(new ErrorHandler("Order details not found !", 404));

  res.status(200).json({ success: true, orderDetail });
});
