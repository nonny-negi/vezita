const express = require("express");

const {
  createReview,
  getDocterReview,
  approveReview,
  blockReview,
  getMyReview,
} = require("../controllers/reviewController");

const {requiresAuth,restrictTo}=require("../middleware/firebaseAuth")

const router = express.Router();

router.route("/").put(requiresAuth, createReview);

router.route("/:id").get(getDocterReview);

router
  .route("/docter/:id")
  .get(getMyReview);

router
  .route("/docter/approve/:id")
  .patch(requiresAuth,restrictTo('docter'), approveReview);

router
  .route("/docter/block/:id")
  .patch(requiresAuth,restrictTo('docter'), blockReview);

module.exports = router;
