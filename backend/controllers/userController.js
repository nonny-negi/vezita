const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { sendEmail } = require("../utils/sendEmail");
const crypto = require("crypto");
// const referralCodeGenerator = require("referral-code-generator");

//models
// const UserWallet = require("../models/userWallet");
const User = require("../models/userModel");

//on-boarding
exports.onBoarding = catchAsyncErrors(async (req, res) => {
  const user = req.user;

  let userUpdate = await User.findByIdAndUpdate(user._id,{new:true});

  res.status(200).json({
    status:true,
    message:"User onboarded.",
    user:userUpdate,
  })
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;

  res.status(200).json({
    status:true,
    message:"User details",
    user:user
  })
});

// Get all users(admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  let users;
  let search = req.query.search; 
  if(search){
    let QStringName = searchQuery(search,"name");
    let QStringEmail = searchQuery(search,"email");
    users = await User.find({$or:QStringName.concat(QStringEmail)});
    return res.status(200).json({
        status:true,
        results:users.length,
        message:"all users",
        users
    })
  }
  users = new APIFeatures(User.find(),req.query).filter();
  const doc = await users.query;

  res.status(200).json({
      status:true,
      results:doc.length,
      message:"all users",
      users:doc
  })
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const userId = req.params.userId;

  let user = await User.findById(userId);
  return res.status(200).json({
      status:true,
      message:"get user details",
      user:user
  })
});

//update user
exports.updateUser = catchAsyncErrors(async(req,res,next) =>{
  const user = req.user;
  const userId = req.params.userId;

  if(user.userType==="admin" || JSON.stringify(user._id)===JSON.stringify(userId)){
      let updatedUser = await User.findByIdAndUpdate(userId,req.body,{new:true});
      return res.status(200).json({
          status:true,
          message:"User updated",
          user:updatedUser
      })
  }else{
      return next(new ErrorHander("You don't have permission to edit user",400))
  }
})


