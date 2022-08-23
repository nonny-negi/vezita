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

const {requiresAuth,restrictTo}=require("../middleware/firebaseAuth")

const router = express.Router();

//Admin
router
  .route("/new-specialization")
  .post(requiresAuth,restrictTo('admin'), addSpecialization);

//Admin
router
  .route("/specialization/:id")
  .patch(requiresAuth,restrictTo('admin'), updateSpecialization)
  .delete(requiresAuth,restrictTo('admin'), deleteSpecialization);

// Get All Specialization (Docter,User)
router.route("/specializations").get(getAllSpecialization);

//Add Docter Specialization (Docter)
router
  .route("/add-docter-specialization")
  .post(requiresAuth,restrictTo('docter'), addDocterSpecialization);

//My Specialization (Docter)
router
  .route("/docter-specialization/me")
  .get(mySpecialization);

//Delete Docter Specialization (Docter)
router
  .route("/docter-specialization/:id")
  .delete(
    requiresAuth,restrictTo('docter'),
    deleteDocterSpecialization
  );

//Add Service (Admin)
router
  .route("/new")
  .post(requiresAuth,restrictTo('admin'), addServices);

//Delete Service
router
  .route("/:id")
  .delete(requiresAuth,restrictTo('admin'), deleteService);

//Add Docter Service
router
  .route("/add-docter-service")
  .post(requiresAuth,restrictTo('docter'), addDocterServices);

//Delete Docter Service  
router
  .route("/delete-docter-service/:id")
  .delete(requiresAuth,restrictTo('docter'), deleteDocterService);

//Get service (User,Docter,Admin)
router.route("/").get(getAllServices);

//Get Service By Specialization (Docter,User,Admin)
router.route("/speciality/:id").get(getServicesBySpecialization);

module.exports = router;
