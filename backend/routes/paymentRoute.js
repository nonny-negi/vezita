const express = require("express");

const {
  processPayment,
  sendStripeApiKey,
  createOrder,
  ordersForUser,
  ordersForDoctor,
  orderDetailsForDocter,
  orderDetailsForUser,
  orderForAdmin,
  orderDetailsForAdmin,
} = require("../controllers/paymentController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router
  .route("/process-payment")
  .post(isAuthenticatedUser, authorizeRoles("user"), processPayment);

router
  .route("/stripe-api-key")
  .get(isAuthenticatedUser, authorizeRoles("user"), sendStripeApiKey);

router
  .route("/create-order")
  .post(isAuthenticatedUser, authorizeRoles("user"), createOrder);

router
  .route("/my-order")
  .get(isAuthenticatedUser, authorizeRoles("user"), ordersForUser);

router
  .route("/docter-order")
  .get(isAuthenticatedUser, authorizeRoles("docter"), ordersForDoctor);

router
  .route("/single/docter-order/:id")
  .get(isAuthenticatedUser, authorizeRoles("docter"), orderDetailsForDocter);

router
  .route("/single/my-order/:id")
  .get(isAuthenticatedUser, authorizeRoles("user"), orderDetailsForUser);

router
  .route("/admin-order")
  .get(isAuthenticatedUser, authorizeRoles("admin"), orderForAdmin);

router
  .route("/single/admin-order/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), orderDetailsForAdmin);

module.exports = router;
