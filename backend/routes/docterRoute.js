const express = require("express");
const {
  docterProfile,
  getAllDocterProfile,
  addEducation,
  getDocterProfileById,
  getMyProfile,
} = require("../controllers/docterController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router
  .route("/profile")
  .put(isAuthenticatedUser, authorizeRoles("docter"), docterProfile);

router
  .route("/all-profile")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllDocterProfile);

router.route("/profile/:id").get(getDocterProfileById);

router
  .route("/profile-me")
  .get(isAuthenticatedUser, authorizeRoles("docter"), getMyProfile);

router
  .route("/add-qualification")
  .post(isAuthenticatedUser, authorizeRoles("docter"), addEducation);

module.exports = router;
