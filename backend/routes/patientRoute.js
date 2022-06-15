const express = require('express')

const {addPatient,addPatientMedical,updatePatient,getSinglePatient} = require('../controllers/patientController')

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router()

router
  .route("/add-patient")
  .post(isAuthenticatedUser, authorizeRoles("user"), addPatient);

router
  .route("/edit-patient")
  .put(isAuthenticatedUser, authorizeRoles("user"), updatePatient);

router.route("/get-patient").get(getSinglePatient);

router
  .route("/add-patientMedical")
  .post(isAuthenticatedUser, authorizeRoles("user"), addPatientMedical);

module.exports = router