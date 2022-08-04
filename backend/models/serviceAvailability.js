const mongoose = require("mongoose");

const serviceAvailabilitySchema = new mongoose.Schema({
    service:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"DoctorService",
        required:true
    },
    docter: {
        type: mongoose.Types.ObjectId,
        ref: "Docter",
    },
    serviceDate:[
        {
        type:Date
        }
    ],
    openingTime:[
        {
        type:Date,
        }
    ],
    closingTime:[
        {
        type:Date
        }
    ],
    availability:[
        {
            availableFrom:{
                type:Date
            },
            availableTo:{
                type:Date
            },
            isAvailable:{
                type:Boolean,
                default:true
            },
            isBooked:{
                type:Boolean,
                default:false
            },
            bookedBy:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            }
        }
    ],
    isDayOf:{
        type:Boolean,
        default:false
    },
    bufferTime:{
        type:Number
    },
    active:{
        type:Boolean,
        default:true
    }
},
    {timestamps:true}
)

serviceAvailabilitySchema.pre(/^find/,function(next){
    this.find({active:{$ne:false}})
    next();
})

module.exports = mongoose.model("ServiceAvailability",serviceAvailabilitySchema,"ServiceAvailability")