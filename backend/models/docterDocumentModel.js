const mongoose = require("mongoose");

const docterDocumentSchema = new mongoose.Schema({
  documentType: {
    type: String,
  },
  document: {
    public_id: String,
    url: String,
  },
});

module.exports = mongoose.model("Document", docterDocumentSchema);
