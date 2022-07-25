const prescriptionController = require("../controllers/prescriptionController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = require("express").Router();

router
  .route("/doctor/:docterId/add")
  .post(
    isAuthenticatedUser,
    authorizeRoles("docter"),
    prescriptionController.addPrescription
  );

router
  .route("/doctor/:docterId/get-all/:patientId")
  .get(
    isAuthenticatedUser,
    authorizeRoles("docter"),
    prescriptionController.getAllPrescription
  );

router
  .route("/user/:userId/get-all/")
  .get(
    isAuthenticatedUser,
    authorizeRoles("user"),
    prescriptionController.getAllPrescriptions
  );

router
  .route("/user/:userId/get-all/:patientId")
  .get(
    isAuthenticatedUser,
    authorizeRoles("user"),
    prescriptionController.getOnePrescription
  );

module.exports = router;
