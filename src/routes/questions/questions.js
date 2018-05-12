const mongoose = require("mongoose");

const QuestionsSchema = new mongoose.Schema({
  page: Number,
  fields: [
    {
      label: String,
      name: String,
      placeholder: String,
      required: Boolean,
      type: { type: String, default: undefined },
      values: [
        {
          name: String,
          value: Number
        }
      ]
    }
  ]
});

module.exports = mongoose.model("Questions", QuestionsSchema);
