const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true
    },
    startDate:{
        type:Date,
    },
    endDate:{
        type:Date
    },
    image:{
        type:String
    },
    bannerType:{
        type:String,
        enum:['app_banner','web_banner'],
        required:true
    },
    active:{
        type:Boolean,
        default:true
    }
},
    {timestamps:true}
)


bannerSchema.pre(/^find/,function(next){
    this.find({active:{$ne:false}})
    next();
});

module.exports = mongoose.model("Banner",bannerSchema,"Banner");