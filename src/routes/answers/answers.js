const mongoose = require("mongoose");

const AnswersSchema = new mongoose.Schema({
  doctor: { type: String, default: null },
  sex: { type: String, default: null },
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  birth_date: { type: Date, default: null },
  medical_consultant: { type: String, default: null },
  job: { type: String, default: null },
  activities: { type: String, default: null },
  size: { type: Number, default: null },
  weight: { type: Number, default: null },
  operateBefore: { type: Boolean, default: null },
  operation_date: { type: Date, default: null },
  operation_cause: { type: String, default: null },
  has_long_term_illnesses: { type: Boolean, default: null },
  long_term_illnesses: { type: String, default: null },
  has_allergies: { type: Boolean, default: null },
  allergies: { type: String, default: null },
  has_medication: { type: Boolean, default: null },
  medication: { type: String, default: null },
  consult: { type: String, default: null },
  legsPain: { type: Boolean, default: null },
  backPain: { type: Boolean, default: null },
  wakeUpPain: { type: Boolean, default: null },
  moovingPain: { type: Boolean, default: null },
  painFree: { type: Boolean, default: null },
  positionPainFree: { type: String, default: null },
  embarrassedWalking: { type: Boolean, default: null },
  distance: { type: Number, default: null },
  cane: { type: Boolean, default: null },
  toiletIssue: { type: Boolean, default: null },
  treatment: { type: String, default: null },
  reeducation: { type: Boolean, default: null },
  infiltration: { type: Boolean, default: null },
  corset: { type: Boolean, default: null },
  improvment: { type: Boolean, default: null },
  rangeLumbarPain: { type: Number, default: null },
  rangeLegPain: { type: Number, default: null },
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
