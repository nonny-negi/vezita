const ErrorHandler = require("../utils/errorhander");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    var message;
    if (Object.keys(err.keyValue) == "email") {
      message = `An account with that ${Object.keys(
        err.keyValue
      )} already exists.`;
    } else {
      message = `${Object.keys(err.keyValue)} already exists.`;
    }

    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err = new ErrorHandler(message, 400);
  }

  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    err = new ErrorHandler(message, 400);
  }

  //ObjectId Validation
  if (
    err.message ===
    "Argument passed in must be a single String of 12 bytes or a string of 24 hex characters"
  ) {
    const message = `Invalid ObjectId Passed`;
    err = new ErrorHandler(message, 500);
  }


  // Validation Error 
  if (err.name === "ValidationError") {
    let message = {};
    for (let key in err.errors) {
      message[key] = err.errors[key].properties.message;
    }
    res.status(err.statusCode).json({
      success: false,
      message: message,
    });
  }
  
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
