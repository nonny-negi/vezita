const express = require("express");

const {
  addCoupon,
  deleteCoupon,
  getAllCoupons,
  getCouponById,
} = require("../controllers/couponController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router
  .route("/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), addCoupon);

router.route("/").get(getAllCoupons);

router
  .route("/:id")
  .get(getCouponById)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCoupon);

module.exports = router;
