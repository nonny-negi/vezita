const {requiresAuth,restrictTo}=require("../middleware/firebaseAuth")
const serviceAvailabilityController = require("../controllers/serviceAvailabilityController");

const router = require("express").Router();

router
  .route("/:serviceId/add-availability")
  .post(
    requiresAuth,restrictTo('docter'),
    serviceAvailabilityController.addServiceAvailability
  );

router
  .route("/:serviceId/availability")
  .get(
    serviceAvailabilityController.getAllAvailability
  );

router
  .route("/:serviceId/availability/:availabilityId/status")
  .patch(
    requiresAuth,restrictTo('docter'),
    serviceAvailabilityController.updateAvailabilityStatus
  );

router
  .route("/:serviceId/availability/:availabilityId")
  .patch(
    requiresAuth,restrictTo('docter'),
    serviceAvailabilityController.udpateAvailability
  );

router
  .route("/docter-availability")
  .get(
    serviceAvailabilityController.getDocterAvailability
  );

router
  .route("/add-docter-availability")
  .post(
    requiresAuth,restrictTo('docter'),
    serviceAvailabilityController.addDocterAvailability
  );

module.exports = router;
