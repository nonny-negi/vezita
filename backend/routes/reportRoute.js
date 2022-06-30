const express = require("express");

const {
  addPatientReport,
  updatePatientReport,
  deletePatientReport,
} = require("../controllers/reportController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router
  .route("/new")
  .post(isAuthenticatedUser, authorizeRoles("user"), addPatientReport);

router
  .route("/:id")
  .patch(isAuthenticatedUser, authorizeRoles("user"), updatePatientReport)
  .delete(isAuthenticatedUser, authorizeRoles("user"), deletePatientReport);

module.exports = router;
