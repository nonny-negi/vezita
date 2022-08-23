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


const {requiresAuth,restrictTo}=require("../middleware/firebaseAuth")


const router = express.Router();

router
  .route("/process-payment")
  .post(requiresAuth,restrictTo('user'), processPayment);

router
  .route("/stripe-api-key")
  .get( sendStripeApiKey);

router
  .route("/create-order")
  .post(requiresAuth,restrictTo('user'), createOrder);

router
  .route("/my-order")
  .get( ordersForUser);

router
  .route("/docter-order")
  .get( ordersForDoctor);

router
  .route("/single/docter-order/:id")
  .get( orderDetailsForDocter);

router
  .route("/single/my-order/:id")
  .get( orderDetailsForUser);

router
  .route("/admin-order")
  .get( orderForAdmin);

router
  .route("/single/admin-order/:id")
  .get( orderDetailsForAdmin);

module.exports = router;
