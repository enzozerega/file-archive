const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: String,
  uploadedBy: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  path: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("File", fileSchema);
