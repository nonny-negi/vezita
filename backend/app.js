const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");

// const { upload, multipleImageHandler } = require("./utils/fileUpload");

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
// app.use("/api/v1", fileUpload());

// Route Imports
const user = require("./routes/userRoute");

app.use("/api/v1/user", user);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
