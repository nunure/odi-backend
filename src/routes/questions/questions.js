const mongoose = require("mongoose");

const QuestionsSchema = new mongoose.Schema({
  page: Number,
  title: String,
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
          value: String
        }
      ],
      visibleIf: [
        {
          name: String,
          value: String
        }
      ]
    }
  ]
});

module.exports = mongoose.model("Questions", QuestionsSchema);
