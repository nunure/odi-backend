const mongoose = require('mongoose');

const QuestionsSchema = new mongoose.Schema({
  title: String,
  answers: [String],
});

module.exports = mongoose.model('Questions', QuestionsSchema);
