const mongoose = require('mongoose');

const { Schema } = mongoose;

const QuestionsSchema = new Schema({
  title: String,
  answers: [String],
});

module.exports = mongoose.model('Questions', QuestionsSchema);
