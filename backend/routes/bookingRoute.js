const bookingController = require("../controllers/bookingController");
const {requiresAuth,restrictTo}=require("../middleware/firebaseAuth")

const router = require("express").Router();

router
  .route("/")
  .post(
    requiresAuth,
    restrictTo('user'),
    bookingController.createBooking
  );

router
  .route("/:bookingId")
  .patch(
    requiresAuth,
    restrictTo('docter'),
    bookingController.updateBookingStatus
  );

router
  .route("/")
  .get(
    bookingController.getBooking
  );

router
  .route("/doctor/get")
  .get(
    bookingController.getBookingFordoctor
  );

router
  .route("/admin/get")
  .get(
    bookingController.getAllBookingsForAdmin
  );

router
  .route("/doctor/accept/:bookingId")
  .get(
    bookingController.acceptOrderByDoctor
  );

router
  .route("/doctor/decline/:bookingId")
  .get(
    bookingController.declineOrderByDoctor
  );

module.exports = router;
