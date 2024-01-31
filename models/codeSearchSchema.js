import mongoose, { Schema, model, models } from "mongoose";

const codeSearchSchema = new mongoose.Schema({
  pharmacy: {
    type: String,
    required: true,
  },
  codes: [
    {
      code: {
        type: Number,
      },
      name: {
        type: String,
      },
      searchCount: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const CodeSearch = models.CodeSearch || model("CodeSearch", codeSearchSchema);

export default CodeSearch;
