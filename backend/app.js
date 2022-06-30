const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const errorMiddleware = require("./middleware/error");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Route Imports
const user = require("./routes/userRoute");
const docter = require("./routes/docterRoute");
const review = require("./routes/reviewRoute");
const service = require("./routes/serviceRoute");
const coupon = require("./routes/couponRoute");
const payment = require("./routes/paymentRoute");
const patient = require("./routes/patientRoute");
const report = require("./routes/reportRoute");
const booking = require("./routes/bookingRoute");
const package = require("./routes/packageRoute");

//route middleware
app.use("/api/v1/user", user);
app.use("/api/v1/docter", docter);
app.use("/api/v1/review", review);
app.use("/api/v1/service", service);
app.use("/api/v1/coupon", coupon);
app.use("/api/v1/payment", payment);
app.use("/api/v1/patient", patient);
app.use("/api/v1/report", report);
app.use("/api/v1/booking", booking);
app.use("/api/v1/package", package);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
