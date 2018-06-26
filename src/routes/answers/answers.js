const mongoose = require("mongoose");

const AnswersSchema = new mongoose.Schema({
  doctor: { type: String, default: null },
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  birth_date: { type: Date, default: null },
  medical_consultant: { type: String, default: null },
  job: { type: String, default: null },
  activities: { type: String, default: null },
  size: { type: Number, default: null },
  weight: { type: Number, default: null },
  rank: { type: Number, default: null },
  odiQuestion1: { type: Number, default: null },
  odiQuestion2: { type: Number, default: null },
  odiQuestion3: { type: Number, default: null },
  odiQuestion4: { type: Number, default: null },
  odiQuestion5: { type: Number, default: null },
  odiQuestion6: { type: Number, default: null },
  odiQuestion7: { type: Number, default: null },
  odiQuestion8: { type: Number, default: null },
  odiQuestion9: { type: Number, default: null },
  odiQuestion10: { type: Number, default: null }
});

module.exports = mongoose.model("Answers", AnswersSchema);
