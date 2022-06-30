
const mongoose = require("mongoose");

const bookingCancelledReasonSchema =new mongoose.Schema({
    booking:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking"
    },
    reason:{
        type:String
    }
},
    {timestamps:true}
)

module.exports = mongoose.model("BookingCancelledReason",bookingCancelledReasonSchema,"BookingCancelledReason");