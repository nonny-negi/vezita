const express = require("express");

const {
  addSpecialization,
  updateSpecialization,
  deleteSpecialization,
  getAllSpecialization,
  addDocterSpecialization,
} = require("../controllers/serviceController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

//Admin
router
  .route("/new-specialization")
  .post(isAuthenticatedUser, authorizeRoles("admin"), addSpecialization);

//Admin
router
  .route("/specialization/:id")
  .patch(isAuthenticatedUser, authorizeRoles("admin"), updateSpecialization)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteSpecialization);

// Get All Specialization (Docter)
router
  .route("/specialization")
  .get(isAuthenticatedUser, authorizeRoles("docter"), getAllSpecialization);

router
  .route("/docter-specialization")
  .post(isAuthenticatedUser, authorizeRoles("docter"), addDocterSpecialization);

module.exports = router;
