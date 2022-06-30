const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const BookingCancelledReason = require("../models/bookingCancelledReason");

exports.addCancelledBookingReason = catchAsyncErrors( async(req,res) =>{

        const {bookingId,reason} = req.body;

        let cancelledReason = await BookingCancelledReason.create({
            booking:bookingId,
            reason:reason
        });

        res.status(200).json({
            status:true,
            msg:"Booking cancelled by following reason.",
            cancelledReason
        })


        return res.status(500).json({
            status:false,
            msg:err.message
        })
    
});