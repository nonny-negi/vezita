const express = require("express");

const {
  createReview,
  getDocterReview,
  approveReview,
  blockReview,
  getMyReview,
} = require("../controllers/reviewController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/").put(isAuthenticatedUser, createReview);

router.route("/:id").get(isAuthenticatedUser, getDocterReview);

router.route("/docter/:id").get(isAuthenticatedUser, getMyReview);

router
  .route("/docter/approve/:id")
  .patch(isAuthenticatedUser, authorizeRoles("docter"), approveReview);

router
  .route("/docter/block/:id")
  .patch(isAuthenticatedUser, authorizeRoles("docter"), blockReview);

module.exports = router;
