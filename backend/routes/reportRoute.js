const express = require("express");

const {
  addPatientReport,
  updatePatientReport,
  deletePatientReport,
  getPatientReport,
  getSinglePatientReport,
  getPatientReportForDocter,
  shareReportToDocter,
  uploadDoctorCert,
} = require("../controllers/reportController");

const {requiresAuth,restrictTo}=require("../middleware/firebaseAuth")

const router = express.Router();

router
  .route("/patient-report/new")
  .post(requiresAuth,restrictTo('user'), addPatientReport);

router
  .route("/:id")
  .patch(requiresAuth,restrictTo('user'), updatePatientReport)
  .delete(requiresAuth,restrictTo('user'), deletePatientReport);

router
  .route("/get/patient-report/:patientId")
  .get(getPatientReport);

router
  .route("/single/patient-report/:id")
  .get(getSinglePatientReport);

router
  .route("/share/docter/:docterId/:reportId")
  .patch(requiresAuth,restrictTo('user'), shareReportToDocter);

router
  .route("/patient-for-docter/:patientId")
  .get(getPatientReportForDocter);

router
  .route("/upload/docter/cert")
  .post(requiresAuth,restrictTo('docter'), uploadDoctorCert);

module.exports = router;
