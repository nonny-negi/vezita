const ErrorHandler = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const Wishlist = require("../models/wishlistModel");

const mongoose = require("mongoose");

//Add to wishlist
exports.addToWishlist = catchAsyncErrors(async (req, res, next) => {
  const data = {
    user: req.user._id,
    docter: mongoose.Types.ObjectId(req.body.docterId),
  };

  const found = await Wishlist.findOne({ docter: req.body.docter });

  if (found)
    return next(
      new ErrorHandler(
        "Docter with this id already exists in your wishlist",
        400
      )
    );

  const newWishlist = await Wishlist.create(data);

  res.status(201).json({ success: true, newWishlist });
});

// get my wishlist
exports.getMyWishlist = catchAsyncErrors(async (req, res, next) => {
  const myWishlist = await Wishlist.find({ user: req.user._id });

  if (myWishlist.length === 0)
    return next(new ErrorHandler("Empty Wishlist", 404));

  res.status(200).json({ success: true, myWishlist });
});

//get my consulted docter
exports.getMyConsultedDocter = catchAsyncErrors(async (req, res, next) => {});

// Remove from wishlist
exports.removeFromWishlist = catchAsyncErrors(async (req, res, next) => {
  const found = await Wishlist.findOne({
    docter: mongoose.Types.ObjectId(req.body.docterId),
  });

  if (!found) return next(new ErrorHandler("Not Found", 404));

  found.remove();

  res.status(200).json({ success: true });
});
