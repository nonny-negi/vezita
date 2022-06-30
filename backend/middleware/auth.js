const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Docter = require("../models/docterModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  let { token } = req.cookies;
  const { authorization } = req.headers;
  if (authorization) {
    token = authorization;
  }

  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  console.log("request sent by", req.user?.email);

  next();
});

exports.authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }
    req.docter = await Docter.findOne({ user: req.user._id });
    next();
  };
};
