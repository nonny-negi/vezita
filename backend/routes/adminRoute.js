const router = require("express").Router();

const {requiresAuth,restrictTo}=require("../middleware/firebaseAuth")

const adminController = require("../controllers/adminController");

// const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router
  .route("/getAllUsers")
  .get(
    restrictTo('admin'),
    adminController.getAllUser
  );

router
  .route("/getAllPatients")
  .get(
    restrictTo('admin'),
    adminController.getAllPatient
  );

router
  .route("/getAllDoctors")
  .get(
    restrictTo('admin'),
    adminController.getAllDoctor
  );

router
  .route("/getUser/:userId")
  .get(restrictTo('admin'), adminController.getUser);

router
  .route("/getDoctor/:doctorId")
  .get(restrictTo('admin'), adminController.getDoctor);

router
  .route("/blockUser/:userId")
  .patch(
    restrictTo('admin'),
    adminController.blockUser
  );

router
  .route("/blockDoctor/:DoctorId")
  .patch(
    restrictTo('admin'),
    adminController.blockDoctor
  );

router
  .route("/address/:medicalRegistrationId/verify")
  .patch(
    restrictTo('admin'),
    adminController.verifyMedicalRegCertificate
  );

router
  .route("/qualification/:qualificationId/verify")
  .patch(
    restrictTo('admin'),
    adminController.verifyQualiCertificate
  );

module.exports = router;
