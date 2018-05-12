const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema({
  title: String,
  message: String
});

module.exports = mongoose.model("Home", HomeSchema);
