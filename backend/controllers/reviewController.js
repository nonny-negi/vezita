const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const mongoose = require("mongoose");

const Docter = require("../models/docterModel");
const Review = require("../models/reviewModel");

//new review
exports.createReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, docterId } = req.body;

  const review = {
    user: req.user._id, //
    rating: Number(rating), //
    comment,
    docter: mongoose.Types.ObjectId(docterId),
  };

  const docter = await Docter.findById(mongoose.Types.ObjectId(docterId));

  const isReviewed = await Review.findOne({ user: req.user._id });

  if (isReviewed) {
    isReviewed.comment = comment;
    isReviewed.rating = Number(rating);
    await isReviewed.save({ validateBeforeSave: false });
  } else {
    const newReview = await Review.create({ ...review });
    docter.reviews.push(newReview._id);
    docter.numOfReviews = docter.reviews.length;
  }
  let total = 0;
  let max_rating = docter.reviews.length * 5;

  const docterReviews = await Review.find({
    docter: mongoose.Types.ObjectId(docterId),
  });

  docterReviews.forEach((rev) => {
    total += rev.rating;
  });

  const rating_calculation = (total * 5) / max_rating;

  docter.totalRatings = rating_calculation.toFixed(2);

  await docter.save({ validateBeforeSave: false });

  res.status(201).json({ msg: "success" });
});

// get docter review
exports.getDocterReview = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const docterReviews = await Docter.aggregate([
    {
      $match: {
        $and: [{ user: mongoose.Types.ObjectId(id) }],
      },
    },
    {
      $unwind: "$reviews",
    },
    {
      $lookup: {
        from: "reviews",
        localField: "reviews",
        foreignField: "_id",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "user",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $unwind: "$user",
          },
          {
            $project: {
              username: "$user.name",
              comment: 1,
              rating: 1,
              _id: 1,
            },
          },
        ],
        as: "reviewObjects",
      },
    },

    { $unwind: "$reviewObjects" },
    {
      $group: {
        _id: "$_id",
        totalRatings: { $first: "$totalRatings" },
        totalReviews: { $first: "$numOfReviews" },
        reviews: {
          $push: {
            name: "$reviewObjects.username",
            comment: "$reviewObjects.comment",
            rating: "$reviewObjects.rating",
          },
        },
      },
    },
  ]);

  if (!docterReviews[0])
    return next(new ErrorHander("Not reviewed yet ! ", 404));

  res.status(200).json({ msg: "success", review: docterReviews[0] });
});

//get my review Docter
exports.getMyReview = catchAsyncErrors(async (req, res, next) => {
  const review = await Docter.aggregate([
    {
      $match: { user: req.user._id },
    },
    {
      $unwind: "$reviews",
    },
    {
      $lookup: {
        from: "reviews",
        localField: "reviews",
        foreignField: "_id",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "user",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $unwind: "$user",
          },
          {
            $project: {
              username: "$user.name",
              comment: 1,
              rating: 1,
              _id: 1,
            },
          },
        ],
        as: "reviewObjects",
      },
    },

    { $unwind: "$reviewObjects" },
    {
      $group: {
        _id: "$_id",
        totalRatings: { $first: "$totalRatings" },
        totalReviews: { $first: "$numOfReviews" },
        reviews: {
          $push: {
            name: "$reviewObjects.username",
            comment: "$reviewObjects.comment",
            rating: "$reviewObjects.rating",
          },
        },
      },
    },
  ]);

  if (!review[0]) return next(new ErrorHander("Invalid Id ", 404));

  res.status(200).json({ msg: "success", review: review[0] });
});

//block review
exports.blockReview = catchAsyncErrors(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) return next(new ErrorHander("Invalid Id ", 404));

  review.status = "block";

  await review.save();

  res.status(200).json({ success: true });
});

//approve review
exports.approveReview = catchAsyncErrors(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) return next(new ErrorHander("Invalid Id ", 404));

  review.status = "approve";

  await review.save();

  res.status(200).json({ success: true });
});
