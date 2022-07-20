const nodeMailer = require("nodemailer");
const handlebars = require('handlebars');
const fs = require('fs');
const path = require("path")


const transporter = ()=>{
  return nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    secure: true,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    }
  });
};

const sendEmail = async (options) => {

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    message: options.message,
  };

  await transporter.sendMail(mailOptions);
};


const readHTMLFile = function(filePath, callback) {
  fs.readFile(filePath, {encoding: 'utf-8'}, function (err, html) {
      if (err) {
         callback(err); 
         throw err;
          
      }
      else {
          callback(null, html);
      }
  });
};


const sendOrderEmail = (
  templateName,
  to,
  clientName,
  clientImage,
  serviceName,
  serviceDate,
  availFrom,
  availTo,
  doctorFullName,
  amount,
  subject,
  acceptUrl,
  declineUrl,
  ) =>{
  let p = path.join(__dirname,`../views/${templateName}.html`);


  readHTMLFile(p, function(err, html) {
      var template = handlebars.compile(html);
      var replacements = {
          to:to,
          clientName:clientName,
          clientImage:clientImage,
          serviceName:serviceName,
          serviceDate:serviceDate,
          availFrom:availFrom,
          availTo:availTo,
          doctorFullName:doctorFullName,
          amount:amount,
          subject:subject,
          acceptUrl:acceptUrl,
          declineUrl:declineUrl
      };
      var htmlToSend = template(replacements);
      var mailOptions = {
          from: process.env.SMPT_MAIL,
          to : to,
          subject : `You have a new request from ${clientName} for approval.`,
          html : htmlToSend
       };
       transporter().sendMail(mailOptions, function (error, response) {
          if (error) {
              console.log(error);
              callback(error);
          }
      });
  });
}

const sendPrescriptionEmail= (
  templateName,
  to,
  clientName,
  clientImage,
  doctorFullName,
  subject,
  ) =>{
  let p = path.join(__dirname,`../views/${templateName}.html`);


  readHTMLFile(p, function(err, html) {
      var template = handlebars.compile(html);
      var replacements = {
          to:to,
          clientName:clientName,
          clientImage:clientImage,
          doctorFullName:doctorFullName,
          subject:subject,
      };
      var htmlToSend = template(replacements);
      var mailOptions = {
          from: process.env.SMPT_MAIL,
          to : to,
          subject : `You have a new prescription from ${doctorFullName} for ${clientName}.`,
          html : htmlToSend
       };
       transporter().sendMail(mailOptions, function (error, response) {
          if (error) {
              console.log(error);
              callback(error);
          }
      });
  });
}

module.exports = {sendEmail,sendOrderEmail,sendPrescriptionEmail}
