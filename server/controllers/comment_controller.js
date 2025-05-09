import Comment from "../models/Comment.js";
import ShowArtWork from "../models/ShowArtWork.js";

export async function createComment(req, res) {
    try {
      const { artworkId, text, parentId } = req.body;
      const userId = req.user.id;
  
      if (!text || !artworkId) {
        return res.status(400).json({ success: false, message: "Text and artworkId are required" });
      }
  
      // Create new comment or reply
      const comment = new Comment({
        text,
        artwork: artworkId,
        user: userId,
        parent: parentId || null
      });
  
      await comment.save();
  
      if (parentId) {
        // It's a reply -> push into parent's replies
        await Comment.findByIdAndUpdate(
          parentId,
          { $push: { replies: comment._id } }
        );
      } else {
        // It's a top-level comment -> push into artwork
        await ShowArtWork.findByIdAndUpdate(
          artworkId,
          { $push: { comments: comment._id } }
        );
      }
  
      res.status(201).json({ success: true, data: comment });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
  