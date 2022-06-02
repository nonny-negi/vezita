const mongoose = require("mongoose");

const docterDocumentSchema = new mongoose.Schema({});

module.exports = mongoose.model("Document", docterDocumentSchema);
