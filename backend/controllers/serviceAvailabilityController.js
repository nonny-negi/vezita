const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhander");
const ServiceAvailability = require("../models/serviceAvailability");

const DoctorService = require("../models/docterServiceModel");
const APIFeatures = require("../utils/apiFeatures");



const Docter = require("../models/docterModel");
const Slot = require("../models/docterSlotModel");
const Session = require("../models/sessionModel");
const Booking = require("../models/bookingModel");
const mongoose = require("mongoose");
const { validateBooking } = require("../utils/requirementValidator");

//add availability
exports.addServiceAvailability = catchAsyncErrors(async (req, res) => {
  let serviceId = mongoose.Types.ObjectId(req.params.serviceId);

  let service = await DoctorService.findById(serviceId);
  if (!service) {
    return res.status(404).json({
      status: false,
      msg: "No service found with service ID.",
    });
  }

  if (JSON.stringify(service.docter) !== JSON.stringify(req.docter._id)) {
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
      service:service._Id,
      docter:req.Doctor._Id,
      serviceDate: req.body.serviceDate,
      openingTime: req.body.openingTime,
      closingTime: req.body.closingTime,
      isDayOf: req.body.isDayOf,
      bufferTime: req.body.bufferTime,
      availability: req.body.availability,
    });

    return res.status(201).json({
      status: true,
      availability,
    });
  }
  
  return res.status(500).json({
    status:false,
    msg:err.message
  })
  
});

//get all availability of a single service
exports.getAllAvailability = catchAsyncErrors(async (req, res) => {
  let docterId = req.Docter._id
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
});

//update availability
exports.updateAvailabilityStatus = catchAsyncErrors(async (req, res) => {
  let availabilityId = req.params.availabilityId;

  let serviceId = req.params.serviceId;
  let service = await DoctorService.findById(req.Docter._Id);
  if (!service) {
    return res.status(404).json({
      status: false,
      msg: "No service found",
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
});

// add extra or remove availability
exports.udpateAvailability = catchAsyncErrors(async (req, res) => {
  const { type } = req.body;
  let availabilityId = req.params.availabilityId;
  // let serviceId = req.params.serviceId;
  let service = await DoctorService.findById(req.Doctor._id);
  if (!service) {
    return res.status(404).json({
      status: false,
      msg: "No service found",
    });
  }

  let serviceAvailability = await ServiceAvailability.findById(availabilityId);

  //for add availability
  if(service && type==='add' && req.body.availability){
      for(let i=0;i<req.body.availability.length;i++){
          serviceAvailability.availability.push(req.body.availability[i])
      }
      await serviceAvailability.save()
  }

  //for remove availability
  if(service && type==='remove' && req.body.availabilityRemoveList){
      for(let i=0;i<req.body.availabilityRemoveList.length;i++){
          serviceAvailability.availability.pull({_id:req.body.availabilityRemoveList[i]})
      }
      await serviceAvailability.save()
  }

  if(service && type==='changeAvailability' && req.body.changeAvailability){
      for(let i=0;i<req.body.changeAvailability.length;i++){
          let update = await ServiceAvailability.findOneAndUpdate(
              {"availability._id":req.body.changeAvailability[i]._id},
              {$set:{"availability.$.isAvailable":req.body.changeAvailability[i].isAvailable}},
              {new:true}
          )                

      }
      let updatedAvailability = await ServiceAvailability.findById(availabilityId)
      return res.status(200).json({
          status:true,
          availability:updatedAvailability
      })
      // await availability.save()
  }


  res.status(200).json({
    status: true,
    availability,
  });
});

//get Docter availability
exports.getDocterAvailability = catchAsyncErrors(async (req, res, next) => {
  const { docterId } = req.query;
  const availability = await Docter.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(docterId) },
    },
    {
      $lookup: {
        from: "docterslots",
        localField: "_id", //
        foreignField: "doctorId",
        as: "slots",
      },
    },
    {
      $lookup: {
        from: "docterspecializations",
        localField: "_id",
        foreignField: "docter",
        pipeline: [
          {
            $lookup: {
              from: "specializations",
              localField: "specializationId",
              foreignField: "_id",
              as: "sp",
            },
          },
          {
            $unwind: "$sp",
          },
          {
            $project: {
              name: "$sp.name",

              _id: 0,
            },
          },
        ],
        as: "specialization",
      },
    },
    {
      $lookup: {
        from: "establishments",
        localField: "_id",
        foreignField: "docter",
        pipeline: [
          {
            $project: {
              _id: 0,
              establishmentName: 1,
              city: 1,
            },
          },
        ],
        as: "establishment",
      },
    },
    {
      $project: {
        reviews: 0,
        user: 0,
        __v: 0,
        status: 0,
      },
    },
  ]);
  const consultedPatients = await Booking.count({
    $and: [{ docterId }, { status: "completed" }],
  });
  res.status(200).json({
    status: true,
    availability: { ...availability[0], consultedPatients },
  });
});

//add docter availability
exports.addDocterAvailability = catchAsyncErrors(async (req, res, next) => {
  let doctorId = req.docter._id;
  console.log(req.body);

  const { sessionType, duration, workingDays, advanceBookingHour, slots } =
    req.body;

  let checkSession = await Session.findOne({
    $and: [{ doctorId }, { sessionType }],
  });

  if (checkSession) return next(new ErrorHandler("session already exits", 400));

  const newSession = await Session.create({
    sessionType,
    duration,
    workingDays,
    advanceBookingHour,
    doctorId,
  });

  let tempSlot = slots.map((slot) => {
    return {
      ...slot,
      doctorId,
      sessionId: newSession._id,
    };
  });

  console.log(tempSlot);

  const availableSlots = await Slot.insertMany(tempSlot);

  res.status(200).json({
    success: true,
    availability: { availableSlots, session: newSession },
  });
});

//availability check
exports.checkSlotAvailability = catchAsyncErrors(async (req, res, next) => {
  const { day, month, year, hour, minute, slotId } = req.body;

  const checkAvail = validateBooking(year, month, day, hour, minute);
  if (!checkAvail.success)
    return next(new ErrorHandler(checkAvail.message, 500));

  let isBookedSlot = await Booking.findOne({
    $and: [
      { slotId },
      { $or: [{ status: "confirmed" }, { status: "completed" }] },
    ],
  });

  if (isBookedSlot) return next(new ErrorHandler("slot not available", 500));

  res.status(200).json({ success: true });
});
