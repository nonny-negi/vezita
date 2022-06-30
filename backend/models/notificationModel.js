const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  reciever: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  notificationType: {
    type: String,
  },
  //   notificationTypeId: ,
});

module.exports = mongoose.model("Notification", notificationSchema);
