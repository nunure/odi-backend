const mongoose = require("mongoose");

const QuestionsSchema = new mongoose.Schema({
  page: Number,
  template: {
    fields: [
      {
        inputType: String,
        label: String,
        min: Number,
        max: Number,
        model: String,
        placeholder: String,
        required: Boolean,
        type: { type: String, default: undefined },
        validator: [String],
        values: [mongoose.Schema.Types.Mixed]
      }
    ]
  }
});

module.exports = mongoose.model("Questions", QuestionsSchema);
