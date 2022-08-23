const express = require("express");

const router = express.Router();

const {requiresAuth,restrictTo}=require("../middleware/firebaseAuth")

const {
  addToWishlist,
  removeFromWishlist,
  getMyWishlist,
} = require("../controllers/wishlistController");

router
  .route("/add-to-wishlist")
  .post(requiresAuth,restrictTo('user'), addToWishlist);

router
  .route("/my-wishlist")
  .get(getMyWishlist);

router
  .route("/remove-from-wishlist/:id")
  .delete(requiresAuth, restrictTo('user'), removeFromWishlist);

module.exports = router;
