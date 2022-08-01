const express = require("express");

const {
  addPatient,
  addPatientMedical,
  updatePatient,
  getSinglePatient,
  getUserPatients,
} = require("../controllers/patientController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router
  .route("/add")
  .post(isAuthenticatedUser, authorizeRoles("user"), addPatient);

router
  .route("/edit/:patientId")
  .patch(isAuthenticatedUser, authorizeRoles("user"), updatePatient);

router
  .route("/get/:patientId")
  .get(isAuthenticatedUser, authorizeRoles("user"), getSinglePatient);

router
  .route("/add-patientMedical")
  .put(isAuthenticatedUser, authorizeRoles("user"), addPatientMedical);

router
  .route("/me")
  .get(isAuthenticatedUser, authorizeRoles("user"), getUserPatients);

module.exports = router;
