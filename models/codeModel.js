import { Schema, model, models } from "mongoose";

const codeSchema = new Schema(
  {
    code: { type: String, required: true },
    name: { type: String, trim: true },
    Notes: { type: String },
  },
  { timestamps: true }
);

const CodeModel = models.Code || model("Code", codeSchema);

export default CodeModel;
