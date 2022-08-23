const express = require("express");

const {
  addCoupon,
  deleteCoupon,
  getAllCoupons,
  getCouponById,
} = require("../controllers/couponController");

const {requiresAuth,restrictTo}=require("../middleware/firebaseAuth")

const router = express.Router();

router
  .route("/new")
  .post(requiresAuth,restrictTo('admin'), addCoupon);

router.route("/").get(getAllCoupons);

router
  .route("/:id")
  .get(getCouponById)
  .delete(requiresAuth,restrictTo('admin'), deleteCoupon);

module.exports = router;
