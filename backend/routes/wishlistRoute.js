const express = require("express");

const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const {
  addToWishlist,
  removeFromWishlist,
  getMyWishlist,
} = require("../controllers/wishlistController");

router
  .route("/add-to-wishlist")
  .post(isAuthenticatedUser, authorizeRoles("user"), addToWishlist);

router
  .route("/my-wishlist")
  .get(isAuthenticatedUser, authorizeRoles("user"), getMyWishlist);

router
  .route("/remove-from-wishlist/:id")
  .delete(isAuthenticatedUser, authorizeRoles("user"), removeFromWishlist);

module.exports = router;
