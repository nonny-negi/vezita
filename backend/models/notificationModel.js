const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    sender:{
        type:String
    },
    reciever:{
        type:String
    },
    title:{
        type:String
    },
    body:{
        type:String
    },
    notificationType:{
        type:String,
    },
    notificationTypeId:{
        type:String
    },
    isRead:{
        type:Boolean,
        default:false
    },
    image:{
        type:String
    }
},
    {timestamps:true}
);

module.exports = mongoose.model("Notification", notificationSchema);
