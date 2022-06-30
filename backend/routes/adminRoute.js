const router = require("express").Router();

const adminController = require("../controllers/adminController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/getAllUsers")
.get(isAuthenticatedUser, authorizeRoles("admin"),adminController.getAllUser);

router.route("/getAllVendors")
.get(isAuthenticatedUser, authorizeRoles("admin"),adminController.getAllVendor);

router.route("/getUser/:userId")
.get(isAuthenticatedUser, authorizeRoles("admin"),adminController.getUser);

router.route("/getVendor/:vendorId")
.get(isAuthenticatedUser, authorizeRoles("admin"),adminController.getVendor);

router.route("/blockUser/:userId")
.patch(isAuthenticatedUser, authorizeRoles("admin"),adminController.blockUser);

router.route("/blockVendor/:vendorId")
.patch(isAuthenticatedUser, authorizeRoles("admin"),adminController.blockVendor);

router.route("/address/:addressProofId/verify")
.patch(isAuthenticatedUser, authorizeRoles("admin"), adminController.verifyAddress);

router.route("/police/:policeCertificateId/verify")
.patch(isAuthenticatedUser, authorizeRoles("admin"),adminController.verifyAddress);

router.route("/qualification/:qualificationId/verify")
.patch(isAuthenticatedUser, authorizeRoles("admin"),adminController.verifyAddress);


module.exports = router;