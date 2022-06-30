const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const serviceAvailabilityController = require("../controllers/serviceAvailabilityController");

const router = require("express").Router();

router.route("/:serviceId/availability")
.post(isAuthenticatedUser, authorizeRoles("doctor"),serviceAvailabilityController.addServiceAvailability);

router.route("/:serviceId/availability")
.get(isAuthenticatedUser, authorizeRoles("doctor"),serviceAvailabilityController.getAllAvailability);

router.route("/:serviceId/availability/:availabilityId/status")
.patch(isAuthenticatedUser, authorizeRoles("doctor"),serviceAvailabilityController.updateAvailabilityStatus);

router.route("/:serviceId/availability/:availabilityId")
.patch(isAuthenticatedUser, authorizeRoles("doctor"),serviceAvailabilityController.udpateAvailability);

module.exports = router;