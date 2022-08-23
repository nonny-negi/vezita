const express = require("express");
const {requiresAuth,restrictTo,generateToken}=require("../middleware/firebaseAuth")

const {
  loginUser,
  updateUser,
  getUserDetails,
  getAllUser,
  onBoarding,
} = require("../controllers/userController");

const router = express.Router();

router.route("/onboarding").post(requiresAuth,onBoarding);

router.route("/login").post(requiresAuth,loginUser);

router.route("/:userId/detail").get(getUserDetails);

router.route("/all-users").get(getAllUser);

router.route("/update/:userId").put(requiresAuth, updateUser);

router.post("/generate-token/:uid",generateToken)

module.exports = router;
