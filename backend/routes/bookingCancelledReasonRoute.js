
const bookingCancelledReasonController = require("../controllers/bookingCancelledReasonController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = require("express").Router();

router.route("/")
.post(isAuthenticatedUser, authorizeRoles("user"),bookingCancelledReasonController.addCancelledBookingReason);

module.exports = router;