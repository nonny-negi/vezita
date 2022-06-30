const express = require("express");
const {
  docterProfile,
  getAllDocterProfile,
  addEducation,
  getDocterProfileById,
  getMyProfile,
  addEstablishment,
  addDocterExperience,
  addDocterMedicalRegistrationDetails,
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

router
  .route("/add-establishment")
  .post(isAuthenticatedUser, authorizeRoles("docter"), addEstablishment);

router
  .route("/add-experience")
  .post(isAuthenticatedUser, authorizeRoles("docter"), addDocterExperience);

router
  .route("/add-medical-registration-detail")
  .post(
    isAuthenticatedUser,
    authorizeRoles("docter"),
    addDocterMedicalRegistrationDetails
  );

module.exports = router;
