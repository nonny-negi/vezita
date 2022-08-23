const express = require("express");

const {requiresAuth,restrictTo}=require("../middleware/firebaseAuth")

const {
  docterProfile,
  getAllDocterProfile,
  addEducation,
  getDocterProfileById,
  getMyProfile,
  addEstablishment,
  addDocterExperience,
  addDocterMedicalRegistrationDetails,
  getDocterBySpecialization,
  getAllDocterForCustormers,
} = require("../controllers/docterController");

const router = express.Router();

router
  .route("/profile")
  .put(requiresAuth,restrictTo('docter'), docterProfile);

router
  .route("/all-profile")
  .get(getAllDocterProfile);

router
  .route("/profile/:id")
  .get(getDocterProfileById);

router
  .route("/profile-user/all")
  .get(getAllDocterForCustormers);

router
  .route("/profile-me")
  .get(getMyProfile);

router
  .route("/add-qualification")
  .post(requiresAuth,restrictTo('docter'), addEducation);

router
  .route("/add-establishment")
  .post(requiresAuth,restrictTo('docter'), addEstablishment);

router
  .route("/add-experience")
  .post(requiresAuth,restrictTo('docter'), addDocterExperience);

router
  .route("/add-medical-registration-detail")
  .post(
    requiresAuth,restrictTo('docter'),
    addDocterMedicalRegistrationDetails
  );

router
  .route("/search/docter-by-specialization/:id")
  .get(getDocterBySpecialization);

module.exports = router;
