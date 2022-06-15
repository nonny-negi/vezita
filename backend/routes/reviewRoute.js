const express = require("express");

const {
  createReview,
  getDocterReview,
} = require("../controllers/reviewController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/").put(isAuthenticatedUser, createReview);

router.route("/:id").get(getDocterReview);

module.exports = router;
