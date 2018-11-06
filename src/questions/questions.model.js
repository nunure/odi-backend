import mongoose from 'mongoose';

export default mongoose.model(
  'Questions',
  new mongoose.Schema(
    {
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
              value: String,
            },
          ],
          visibleIf: [
            {
              name: String,
              value: String,
            },
          ],
        },
      ],
    },
  ),
);
