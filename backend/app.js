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

//route middleware
app.use("/api/v1/user", user);
app.use("/api/v1/docter", docter);
app.use("/api/v1/review", review);
app.use("/api/v1/service", service);
app.use("/api/v1/coupon", coupon);
app.use("/api/v1/payment", payment);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
