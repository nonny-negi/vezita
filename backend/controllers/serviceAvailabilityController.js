const ServiceAvailability = require("../models/serviceAvailability");
const doctorService = require("../models/doctorServicesModel");
const APIFeatures = require("../utils/apiFeatures");

//add availability
exports.addServiceAvailability = async (req, res) => {
  try {
    let serviceId = req.params.serviceId;

    let service = await doctorService.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        status: false,
        msg: "No service found with service ID.",
      });
    }

    if (JSON.stringify(service.vendor) !== JSON.stringify(req.vendor._id)) {
      return res.status(400).json({
        status: false,
        msg: "Only Service Owner can add availability",
      });
    }

    if (service.serviceType === "fixed_price") {
      if (!req.body.fixedPriceAvailability) {
        return res.status(400).json({
          status: false,
          msg: "Please pass fixedPriceAvailability in req body because this service is fixed_price based.",
        });
      }
      let checkServiceAvailability = await ServiceAvailability.findOne({
        serviceDate: req.body.serviceDate,
      });
      if (checkServiceAvailability) {
        let deleteServiceAvailability =
          await ServiceAvailability.findOneAndDelete({
            serviceDate: req.body.serviceDate,
          });
      }
      let availability = await ServiceAvailability.create({
        service: serviceId,
        serviceDate: req.body.serviceDate,
        openingTime: req.body.openingTime,
        closingTime: req.body.closingTime,
        isDayOf: req.body.isDayOf,
        bufferTime: req.body.bufferTime,
        fixedPriceAvailability: req.body.fixedPriceAvailability,
      });

      return res.status(201).json({
        status: true,
        availability,
      });
    } else if (service.serviceType === "hourly_price") {
      if (!req.body.hourlyAvailability) {
        return res.status(400).json({
          status: false,
          msg: "Please pass hourlyAvailability in req body because this is hourly based",
        });
      }

      let availability = await ServiceAvailability.create({
        service: serviceId,
        serviceDate: req.body.serviceDate,
        openingTime: req.body.openingTime,
        closingTime: req.body.closingTime,
        isDayOf: req.body.isDayOf,
        bufferTime: req.body.bufferTime,
        hourlyAvailability: req.body.hourlyAvailability,
      });

      return res.status(201).json({
        status: true,
        availability,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      msg: err.message,
    });
  }
};

//get all availability of a single service
exports.getAllAvailability = async (req, res) => {
  try {
    let serviceId = req.params.serviceId;
    console.log(req.query);
    let availability = new APIFeatures(
      ServiceAvailability.find({ service: serviceId }),
      req.query
    ).advanceFilter();
    let doc = await availability.query;

    res.status(200).json({
      status: true,
      results: doc.length,
      availability: doc,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      msg: err.message,
    });
  }
};

//update availability
exports.updateAvailabilityStatus = async (req, res) => {
  try {
    let availabilityId = req.params.availabilityId;

    let serviceId = req.params.serviceId;
    let service = await doctorService.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        status: false,
        msg: "No service found with service ID.",
      });
    }

    let availabilityUpdate = await ServiceAvailability.findByIdAndUpdate(
      availabilityId,
      req.body,
      { new: true }
    );

    res.status(200).json({
      status: true,
      availability: availabilityUpdate,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      msg: err.message,
    });
  }
};

// add extra or remove availability
exports.udpateAvailability = async (req, res) => {
  try {
    const { type } = req.body;
    let availabilityId = req.params.availabilityId;
    let serviceId = req.params.serviceId;
    let service = await doctorService.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        status: false,
        msg: "No service found with service ID.",
      });
    }

    let availability = await ServiceAvailability.findById(availabilityId);

    //for add availability
    if (
      service.serviceType === "fixed_price" &&
      type === "add" &&
      req.body.fixedPriceAvailability
    ) {
      for (let i = 0; i < req.body.fixedPriceAvailability.length; i++) {
        availability.fixedPriceAvailability.push(
          req.body.fixedPriceAvailability[i]
        );
      }
      await availability.save();
    }
    if (
      service.serviceType === "hourly_price" &&
      type === "add" &&
      req.body.hourlyAvailability
    ) {
      for (let i = 0; i < req.body.hourlyAvailability.length; i++) {
        availability.hourlyAvailability.push(req.body.hourlyAvailability[i]);
      }
      await availability.save();
    }

    //for remove availability
    if (
      service.serviceType === "fixed_price" &&
      type === "remove" &&
      req.body.fixedPriceAvailabilityRemoveList
    ) {
      for (
        let i = 0;
        i < req.body.fixedPriceAvailabilityRemoveList.length;
        i++
      ) {
        availability.fixedPriceAvailability.pull({
          _id: req.body.fixedPriceAvailabilityRemoveList[i],
        });
      }
      await availability.save();
    }

    //for remove availability
    if (
      service.serviceType === "hourly_price" &&
      type === "remove" &&
      req.body.hourlyAvailabilityRemoveList
    ) {
      for (let i = 0; i < req.body.hourlyAvailabilityRemoveList.length; i++) {
        availability.hourlyAvailability.pull({
          _id: req.body.hourlyAvailabilityRemoveList[i],
        });
      }
      await availability.save();
    }

    if (
      service.serviceType === "fixed_price" &&
      type === "changeAvailability" &&
      req.body.fixedPriceChangeAvailability
    ) {
      for (let i = 0; i < req.body.fixedPriceChangeAvailability.length; i++) {
        let update = await ServiceAvailability.findOneAndUpdate(
          {
            "fixedPriceAvailability._id":
              req.body.fixedPriceChangeAvailability[i]._id,
          },
          {
            $set: {
              "fixedPriceAvailability.$.isAvailable":
                req.body.fixedPriceChangeAvailability[i].isAvailable,
            },
          },
          { new: true }
        );
      }
      let updatedAvailability = await ServiceAvailability.findById(
        availabilityId
      );
      return res.status(200).json({
        status: true,
        availability: updatedAvailability,
      });
      // await availability.save()
    }

    if (
      service.serviceType === "hourly_price" &&
      type === "changeAvailability" &&
      req.body.hourlyChangeAvailability
    ) {
      for (let i = 0; i < req.body.hourlyChangeAvailability.length; i++) {
        let update = await ServiceAvailability.findOneAndUpdate(
          {
            "hourlyAvailability._id": req.body.hourlyChangeAvailability[i]._id,
          },
          {
            $set: {
              "hourlyAvailability.$.isAvailable":
                req.body.hourlyChangeAvailability[i].isAvailable,
            },
          },
          { new: true }
        );
      }
      let updatedAvailability = await ServiceAvailability.findById(
        availabilityId
      );
      return res.status(200).json({
        status: true,
        availability: updatedAvailability,
      });
      // await availability.save()
    }

    res.status(200).json({
      status: true,
      availability,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      msg: err.message,
    });
  }
};
