const express = require("express");

const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const bannerController = require("../controllers/bannerController");

//upload banner by docter
router
  .route("/docter/upload")
  .post(
    isAuthenticatedUser,
    authorizeRoles("docter"),
    bannerController.uploadBanner
  );

router
  .route("/docter/me")
  .get(
    isAuthenticatedUser,
    authorizeRoles("docter"),
    bannerController.getDocterBanner
  );

router
  .route("/admin/approve/:id")
  .patch(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    bannerController.ApproveBannerAdmin
  );

router
  .route("/admin/reject/:id")
  .patch(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    bannerController.RejectBannerAdmin
  );

router
  .route("/admin/all")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    bannerController.getDocterBannerForAdmin
  );

module.exports = router;
