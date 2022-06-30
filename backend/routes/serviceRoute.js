const express = require("express");

const {
  addSpecialization,
  updateSpecialization,
  deleteSpecialization,
  getAllSpecialization,
  addDocterSpecialization,
  deleteDocterSpecialization,
  mySpecialization,
  addServices,
  addDocterServices,
  getAllServices,
  deleteService,
  getServicesBySpecialization,
  deleteDocterService,
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

// Get All Specialization (Docter,User)
router.route("/specializations").get(isAuthenticatedUser, getAllSpecialization);

//Add Docter Specialization (Docter)
router
  .route("/add-docter-specialization")
  .post(isAuthenticatedUser, authorizeRoles("docter"), addDocterSpecialization);

//My Specialization (Docter)
router
  .route("/docter-specialization/me")
  .get(isAuthenticatedUser, authorizeRoles("docter"), mySpecialization);

//Delete Docter Specialization (Docter)
router
  .route("/docter-specialization/:id")
  .delete(
    isAuthenticatedUser,
    authorizeRoles("docter"),
    deleteDocterSpecialization
  );

//Add Service (Admin)
router
  .route("/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), addServices);

//Delete Service
router
  .route("/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteService);

//Add Docter Service
router
  .route("/add-docter-service")
  .post(isAuthenticatedUser, authorizeRoles("docter"), addDocterServices);

//Delete Docter Service  
router
  .route("/delete-docter-service/:id")
  .delete(isAuthenticatedUser, authorizeRoles("docter"), deleteDocterService);

//Get service (User,Docter,Admin)
router.route("/").get(getAllServices);

//Get Service By Specialization (Docter,User,Admin)
router.route("/speciality/:id").get(getServicesBySpecialization);

module.exports = router;
