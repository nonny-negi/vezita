const express = require("express");

const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const {
  newPackage,
  updatePackage,
  deletePackage,
  selectPackageByDocter,
} = require("../controllers/packageController");

//New package (Admin)
router
  .route("/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newPackage);

//Update Package (Admin)
router
  .route("/:id")
  .patch(isAuthenticatedUser, authorizeRoles("admin"), updatePackage);

//Delete Package (Admin)
router
  .route("/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deletePackage);

//Select package By Docter
router
  .route("/new/docter-package")
  .post(isAuthenticatedUser, authorizeRoles("docter"), selectPackageByDocter);

module.exports = router;
