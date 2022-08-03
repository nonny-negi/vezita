const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const { sendEmail } = require("../utils/sendEmail");
const crypto = require("crypto");
const referralCodeGenerator = require("referral-code-generator");

//models
const UserWallet = require("../models/userWallet");
const User = require("../models/userModel");
const UserTemporary = require("../models/tempUserModel");


//temp user
exports.createTemporaryUser = catchAsyncErrors(async (req, res, next) => {
  const { displayName, email, uid, inviteReferralCode } = req.body;
  let isNewUser = false;
  let user = await User.findOne({ email: email, uid: uid });

  if (user) {
    return res.status(200).json({
      status: false,
      msg: "user already exist",
    });
  }
  const checkUser = await UserTemporary.findOne({ email: email });

  if (checkUser) {
    const tempUser = await UserTemporary.findByIdAndUpdate(checkUser._id, {
      uid: uid,
      referralCode: inviteReferralCode,
      name: displayName,
    });
  } else {
    const tempUser = await UserTemporary.create({
      email: email,
      uid: uid,
      referralCode: inviteReferralCode,
      name: displayName,
    });
  }

  return res.status(200).json({
    status: true,
    msg: "temp user add successfully",
  });
});

//on-boarding
exports.onBoarding = catchAsyncErrors(async (req, res, next) => {
  const { displayName, email, photoUrl } = req.body;
  const fbuser = await UserTemporary.findOne({ email });
  let isNewUser = false;
  let user = await User.findOne({ email: email, uid: fbuser.uid });

  //generate referral code
  let referralCode = referralCodeGenerator.alphaNumeric("uppercase", 2, 4);
  let inviteReferralCode;
  if (!user) {
    const tempUser = await UserTemporary.findOne({
      email: email,
      uid: fbuser.uid,
    });
    if (tempUser) {
      inviteReferralCode = tempUser.referralCode;
    }
    let invitedBy;
    let referrerUser = await User.findOne({
      referralCode: inviteReferralCode,
    });
    if (referrerUser) {
      invitedBy = referrerUser._id;
    }

    user = await User.create({
      email: email,
      uid: fbuser.uid,
      name: displayName,
      avatar: photoUrl,
      firebaseSignInProvider: fbuser.firebase.sign_in_provider,
      invitedBy: invitedBy,
      isEmailVerified: true,
      referralCode: referralCode,
    });
    isNewUser = true;

    let wallet = await UserWallet.create({
      user: user._id,
    });
    let referrerWallet = await UserWallet.findOne({ user: invitedBy });

    if (invitedBy && referrerWallet) {
      // let referrerPointTransaction = await pointHandler(
      //   referrerWallet._id,
      //   "credit",
      //   "referrer",
      //   25,
      //   referrerWallet.points,
      //   referrerWallet.points + 25,
      //   "25 points added to your wallet.",
      //   user._id
      // );
      referrerWallet.points = referrerWallet.points + 25;
      await referrerWallet.save();

      // let currentUserPointTransaction = await pointHandler(
      //   wallet._id,
      //   "credit",
      //   "referred",
      //   50,
      //   wallet.points,
      //   wallet.points + 50,
      //   "50 points added to your wallet.",
      //   invitedBy
      // );
      wallet.points = wallet.points + 50;
      await wallet.save();
    }

    if (tempUser) {
      await UserTemporary.findByIdAndDelete(tempUser._id);
    }
  } else {
    if (!user.referralCode) {
      user.referralCode = referralCode;
      await user.save();
    }
    let wallet = await UserWallet.findOne({ user: user._id });
    if (!wallet) {
      wallet = await UserWallet.create({
        user: user._id,
      });
    }
  }

  sendToken(user, 200, res);
});

//google auth user
exports.googleAuth = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.body;
  const ticket = await googleClient.verifyIdToken({
    idToken: token,
    audient: `${process.env.GOOGLE_CLIENT_ID}`,
  });
  const payload = ticket.getPayload();
  let user = await User.findOne({ email: payload?.email });
  if (!user) {
    user = new User({
      email: payload?.email,
      name: payload?.name,
    });

    await user.save();
  }
  sendToken(user, 201, res);
});

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, phone } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    phone,
  });
  sendToken(user, 201, res);
});

//register a Docter
exports.registerDocter = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, phone } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    role: "docter",
    phone,
  });
  sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }
  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
  try {
    await sendEmail({
      email: user.email,
      subject: ` Password Recovery`,
      message: message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHander(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Get all users(admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
