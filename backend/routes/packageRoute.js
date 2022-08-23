const express = require("express");

const router = express.Router();

const {requiresAuth,restrictTo}=require("../middleware/firebaseAuth")

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
  .post(requiresAuth,restrictTo('admin'), newPackage);

//Update Package (Admin)
router
  .route("/:id")
  .patch(requiresAuth,restrictTo('admin'), updatePackage);

//Get All Packages (admin)
router
  .route("/")
  .get(getAllPackages);

//Delete Package (Admin)
router
  .route("/:id")
  .delete(requiresAuth,restrictTo('admin'), deletePackage);

//Select package By Docter
router
  .route("/new/docter-package")
  .post(requiresAuth,restrictTo('docter'), selectPackageByDocter);

module.exports = router;
