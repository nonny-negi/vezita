
const bookingController = require("../controllers/bookingController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = require("express").Router()


router.route("/")
.post(isAuthenticatedUser, authorizeRoles("user"), bookingController.createBooking);

router.route("/:bookingId")
.patch(isAuthenticatedUser, authorizeRoles("doctor"),bookingController.updateBookingStatus);

router.route("/")
.get(isAuthenticatedUser, authorizeRoles("user"), bookingController.getBooking);

router.route("/doctor/get")
.get(isAuthenticatedUser, authorizeRoles("doctor"), bookingController.getBookingForDoctor);

router.route("/admin/get")
.get(isAuthenticatedUser, authorizeRoles("admin"), bookingController.getAllBookingsForAdmin);

router.route("/doctor/accept/:bookingId")
.get(isAuthenticatedUser, authorizeRoles("doctor"), bookingController.acceptOrderByDoctor);

router.route("/doctor/decline/:bookingId")
.get(isAuthenticatedUser, authorizeRoles("doctor"), bookingController.declineOrderByDoctor);


module.exports = router;