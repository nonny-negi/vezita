const analyticsController = require("../controllers/analyticsController");
const {requiresAuth,restrictTo}=require("../middleware/firebaseAuth")

const router = require("express").Router();

//No. of appointments/day
router
  .route("/doctor/:docterId/total-accepted")
  .get(
    analyticsController.getTotalaccepted
  );

//over all transaction
router
  .route("/doctor/:docterId/total-declined")
  .get(
    analyticsController.getTotaldeclined
  );

//no. of accepted
router
  .route("/doctor/:docterId/total-booking")
  .get(
    analyticsController.getTotalBookingPerDay
  );

//no. of declined
router
  .route("/doctor/:docterId/total-transaction")
  .get(
    analyticsController.getTotalTransaction
  );

module.exports = router;
