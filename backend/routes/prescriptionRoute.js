const prescriptionController = require("../controllers/prescriptionController");
// const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const {requiresAuth,restrictTo}=require("../middleware/firebaseAuth")

const router = require("express").Router();

router
  .route("/doctor/:docterId/add")
  .post(
    requiresAuth,restrictTo('docter'),
    prescriptionController.addPrescription
  );

router
  .route("/doctor/:docterId/get-all/:patientId")
  .get(
    requiresAuth,restrictTo('docter'),
    prescriptionController.getAllPrescription
  );

router
  .route("/user/:userId/get-all/")
  .get(
    prescriptionController.getAllPrescriptions
  );

router
  .route("/user/:userId/get-all/:patientId")
  .get(
    prescriptionController.getOnePrescription
  );

module.exports = router;
