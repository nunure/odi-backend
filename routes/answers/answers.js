const mongoose = require('mongoose');

const AnswersSchema = new mongoose.Schema({
  model: {
    doctor: { type: Number, default: null },
    test1: { type: String, default: null },
    test2: { type: String, default: null },
    odiQuestion1: { type: Number, default: null },
    odiQuestion2: { type: Number, default: null },
    odiQuestion3: { type: Number, default: null },
    odiQuestion4: { type: Number, default: null },
    odiQuestion5: { type: Number, default: null },
    odiQuestion6: { type: Number, default: null },
    odiQuestion7: { type: Number, default: null },
    odiQuestion8: { type: Number, default: null },
    odiQuestion9: { type: Number, default: null },
    odiQuestion10: { type: Number, default: null },
  },
});

module.exports = mongoose.model('Answers', AnswersSchema);
