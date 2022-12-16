const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  title: String,
  des: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

const FileModel =mongoose.model("files", FileSchema);

module.exports = FileModel;

