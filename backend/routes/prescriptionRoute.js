const prescriptionController = require("../controllers/prescriptionController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = require("express").Router()


router.route("/doctor/prescription/:docterId/add")
.post(isAuthenticatedUser, authorizeRoles("docter"), prescriptionController.addPrescription);

router.route("/doctor/prescription/:docterId/getAll/:patientId")
.get(isAuthenticatedUser, authorizeRoles("docter"), prescriptionController.getAllPrescription);

router.route("/prescription/:userId/getAll/")
.get(isAuthenticatedUser, authorizeRoles("user"), prescriptionController.getAllPrescriptions);

router.route("/prescription/:userId/getAll/:patientId")
.get(isAuthenticatedUser, authorizeRoles("user"), prescriptionController.getOnePrescription);