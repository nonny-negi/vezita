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
const admin = require("./routes/adminRoute");
const booking = require("./routes/bookingRoute");
const patient = require("./routes/patientRoute");
const serviceAvailability = require("./routes/serviceAvailabilityRoute");
const bookingCancelledReason = require("./routes/bookingCancelledReasonRoute");
const prescription = require("./routes/prescriptionRoute");
const analytics = require("./routes/analyticsRoute");
const user = require("./routes/userRoute");
const docter = require("./routes/docterRoute");
const review = require("./routes/reviewRoute");
const service = require("./routes/serviceRoute");
const coupon = require("./routes/couponRoute");
const payment = require("./routes/paymentRoute");

//route middleware
app.use("/api/v1/admin", admin);
app.use("/api/v1/booking", booking);
app.use("/api/v1/patient", patient);
app.use("/api/v1/seviceAvailability",serviceAvailability);
app.use("/api/v1/bookingCancelledReason",bookingCancelledReason);
app.use("/api/v1/prescription",prescription);
app.use("/api/v1/analytics",analytics);
app.use("/api/v1/user", user);
app.use("/api/v1/docter", docter);
app.use("/api/v1/review", review);
app.use("/api/v1/service", service);
app.use("/api/v1/coupon", coupon);
app.use("/api/v1/payment", payment);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
