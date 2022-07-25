const express = require("express");

const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const {
  newPackage,
  updatePackage,
  deletePackage,
  selectPackageByDocter,
  getAllPackages,
} = require("../controllers/packageController");

//New package (Admin)
router
  .route("/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newPackage);

//Update Package (Admin)
router
  .route("/:id")
  .patch(isAuthenticatedUser, authorizeRoles("admin"), updatePackage);

//Get All Packages (admin)
router
  .route("/")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllPackages);

//Delete Package (Admin)
router
  .route("/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deletePackage);

//Select package By Docter
router
  .route("/new/docter-package")
  .post(isAuthenticatedUser, authorizeRoles("docter"), selectPackageByDocter);

module.exports = router;
