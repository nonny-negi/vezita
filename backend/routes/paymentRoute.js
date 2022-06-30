const express = require("express");

const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/process-payment").post(isAuthenticatedUser, processPayment);

router.route("/stripe-api-key").get(isAuthenticatedUser, sendStripeApiKey);


module.exports = router;