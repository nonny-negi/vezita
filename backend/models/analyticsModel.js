const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Docter'
    },
    accepted:{
        isAcceped:{
            type:Boolean,
            default:false
        },
        time:{
            type:String
        },
        date: {
            type:String
        },
    },
    declined:{
        isDeclined:{
            type:Boolean,
            default:false
        },
        time:{
            type:String
        },
        date: {
            type:String
        },
    },
    totalEarned:{
        type:Number,
    }
});

module.exports = mongoose.model("analytics",analyticsSchema);