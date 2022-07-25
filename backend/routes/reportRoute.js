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

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router
  .route("/patient-report/new")
  .post(isAuthenticatedUser, authorizeRoles("user"), addPatientReport);

router
  .route("/:id")
  .patch(isAuthenticatedUser, authorizeRoles("user"), updatePatientReport)
  .delete(isAuthenticatedUser, authorizeRoles("user"), deletePatientReport);

router
  .route("/get/patient-report/:patientId")
  .get(isAuthenticatedUser, authorizeRoles("user"), getPatientReport);

router
  .route("/single/patient-report/:id")
  .get(isAuthenticatedUser, authorizeRoles("user"), getSinglePatientReport);

router
  .route("/share/docter/:docterId/:reportId")
  .patch(isAuthenticatedUser, authorizeRoles("user"), shareReportToDocter);

router
  .route("/patient-for-docter/:patientId")
  .get(isAuthenticatedUser, authorizeRoles("user"), getPatientReportForDocter);

router
  .route("/upload/docter/cert")
  .post(isAuthenticatedUser, authorizeRoles("docter"), uploadDoctorCert);

module.exports = router;
