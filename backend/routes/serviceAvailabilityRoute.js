const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const serviceAvailabilityController = require("../controllers/serviceAvailabilityController");

const router = require("express").Router();

router
  .route("/:serviceId/availability")
  .post(
    isAuthenticatedUser,
    authorizeRoles("docter"),
    serviceAvailabilityController.addServiceAvailability
  );

router
  .route("/:serviceId/availability")
  .get(
    isAuthenticatedUser,
    authorizeRoles("docter"),
    serviceAvailabilityController.getAllAvailability
  );

router
  .route("/:serviceId/availability/:availabilityId/status")
  .patch(
    isAuthenticatedUser,
    authorizeRoles("docter"),
    serviceAvailabilityController.updateAvailabilityStatus
  );

router
  .route("/:serviceId/availability/:availabilityId")
  .patch(
    isAuthenticatedUser,
    authorizeRoles("docter"),
    serviceAvailabilityController.udpateAvailability
  );

module.exports = router;
