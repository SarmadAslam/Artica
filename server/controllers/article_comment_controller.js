import Article from "../models/Article.js";
import ArticleComment from "../models/ArticleComment.js";

export const createArticleComment = async (req, res) => {
  try {
    const { articleId, content, parentCommentId } = req.body; // 👈 Fix this line
    const userId = req.user.id;

    if (!content || !articleId) {
      return res.status(400).json({ success: false, message: "Content and articleId are required" });
    }

    const comment = new ArticleComment({
      content,
      author: userId,
      article: articleId,
      parentComment: parentCommentId || null, // 👈 Fix this line too
    });

    await comment.save();

    if (parentCommentId) {
      // It’s a reply, push into parent’s replies
      await ArticleComment.findByIdAndUpdate(parentCommentId, {
        $push: { replies: comment._id }
      });
    } else {
      // It’s a top-level comment, push into Article
      await Article.findByIdAndUpdate(articleId, {
        $push: { comments: comment._id }
      });
    }

    res.status(201).json({ success: true, data: comment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
