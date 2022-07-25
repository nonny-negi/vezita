const router = require("express").Router();

const adminController = require("../controllers/adminController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router
  .route("/getAllUsers")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    adminController.getAllUser
  );

router
  .route("/getAllPatients")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    adminController.getAllPatient
  );

router
  .route("/getAllDoctors")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    adminController.getAllDoctor
  );

router
  .route("/getUser/:userId")
  .get(isAuthenticatedUser, authorizeRoles("admin"), adminController.getUser);

router
  .route("/getDoctor/:doctorId")
  .get(isAuthenticatedUser, authorizeRoles("admin"), adminController.getDoctor);

router
  .route("/blockUser/:userId")
  .patch(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    adminController.blockUser
  );

router
  .route("/blockDoctor/:DoctorId")
  .patch(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    adminController.blockDoctor
  );

router
  .route("/address/:medicalRegistrationId/verify")
  .patch(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    adminController.verifyMedicalRegCertificate
  );

router
  .route("/qualification/:qualificationId/verify")
  .patch(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    adminController.verifyQualiCertificate
  );

module.exports = router;
