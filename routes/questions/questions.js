const mongoose = require('mongoose');

// A éclaircir, pourquoi est-ce que si on met n'imp ici
// on récupère quand même ce qu'il faut dans le front ?
// Est-ce qu'on doit préciser à chaque fois les cham requis ?
// Si oui à préciser en base égallement ?
const QuestionsSchema = new mongoose.Schema({
  type: String,
  inputType: String,
  label: String,
  model: String,
  maxLength: Number,
  placeholder: String,
  page: Number,
  required: Boolean,
  answers: [{
    name: String,
    value: Number,
  }],
});

module.exports = mongoose.model('Questions', QuestionsSchema);
