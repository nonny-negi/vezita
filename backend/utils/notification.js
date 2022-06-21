const NotificationModel = require("../models/notificationModel");
const admin  = require('firebase-admin');

exports.sendNotification = async(topic,reciever,title,message,notificationType,notificationTypeId) => {
    const messaging = admin.messaging()
    var payload = {
        notification: {
            title,
            body: message,
        },
        topic: topic
        };

    messaging.send(payload)
    .then((result) => {
        console.log(result)
    })
    await NotificationModel.create({
        reciever:reciever,
        title:title,
        body:message,
        notificationType:notificationType,
        notificationTypeId:notificationTypeId,
    })
}