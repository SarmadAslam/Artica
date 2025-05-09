import mongoose from "mongoose";

const competitionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    guidelines: { type: String },
    deadline: { type: Date, required: true },
    status: { type: String, enum: ["draft", "published", "closed"], default: "draft" },
    votes: { type: Number, default: 0 },
    participationCount: { type: Number, default: 0 }, // <-- new
  },
  { timestamps: true }
);

export const Competition = mongoose.model("Competition", competitionSchema);
