const analyticsController = require("../controllers/analyticsController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = require("express").Router()

//No. of appointments/day
router.route("/doctor/:docterId/analytics/total-accepted")
.get(isAuthenticatedUser, authorizeRoles("docter"), analyticsController.getTotalaccepted);

//over all transaction
router.route("/doctor/:docterId/analytics/total-declined")
.get(isAuthenticatedUser, authorizeRoles("docter"), analyticsController.getTotaldeclined);

//no. of accepted
router.route("/doctor/:docterId/analytics/total-booking")
.get(isAuthenticatedUser, authorizeRoles("docter"), analyticsController.getTotalBookingPerDay);

//no. of declined
router.route("/doctor/:docterId/analytics/total-transaction")
.get(isAuthenticatedUser, authorizeRoles("docter"), analyticsController.getTotalTransaction);