// models/Comment.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  artwork: { type: mongoose.Schema.Types.ObjectId, ref: "ShowArtWork", required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null }, // for replies
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }] // optional: for easy population
}, { timestamps: true });

export default mongoose.model("Comment", commentSchema);
