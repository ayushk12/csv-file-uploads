const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  url: {
    type: String,
  },
});

const File = mongoose.model("CSV", fileSchema);
module.exports = File;
