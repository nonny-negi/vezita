const mongoose = require("mongoose");

const docterPackageSchema = new mongoose.Schema({});

module.exports = mongoose.model("DocterPackage", docterPackageSchema);
