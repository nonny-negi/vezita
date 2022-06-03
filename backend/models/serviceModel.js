const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({});

exports.model = mongoose.model("Service", serviceSchema);
