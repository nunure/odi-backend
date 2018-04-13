const mongoose = require('mongoose');

const QuestionsSchema = new mongoose.Schema({
  page: Number,
  template: {
    fields: [
      {
        inputType: String,
        label: String,
        maxLength: Number,
        model: String,
        placeholder: String,
        required: Boolean,
        type: { type: String, default: undefined },
        values: [
          {
            name: String,
            value: Number,
          },
        ],
      },
    ],
  },
});

module.exports = mongoose.model('Questions', QuestionsSchema);
