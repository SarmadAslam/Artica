import mongoose from "mongoose";

const exhibitionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    guidelines: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["upcoming", "open", "closed"],
      default: "upcoming",
    },
    artistSubmissions: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Exhibition = mongoose.model("Exhibition", exhibitionSchema);
