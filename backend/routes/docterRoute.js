const express = require("express");
const {
  docterProfile,
  getDocterProfiles,
  addEducation,
} = require("../controllers/docterController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router
  .route("/profile")
  .put(isAuthenticatedUser, authorizeRoles("docter"), docterProfile);

router.route("/all-profile").get(getDocterProfiles);
router
  .route("/add-qualification")
  .post(isAuthenticatedUser, authorizeRoles("docter"), addEducation);

module.exports = router;
