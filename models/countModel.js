import { Schema, model, models } from "mongoose";

const countSchema = new Schema(
  {
    count: { type: Number, default: 1 },
    code: { type: String },
    name: { type: String, trim: true },
  },
  { timestamps: true }
);

const CountModel = models.Count || model("Count", countSchema);

export default CountModel;
