import mongoose from 'mongoose';

const articleCommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
    required: true,
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ArticleComment',
    default: null,
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ArticleComment',
    },
  ],
}, { timestamps: true });

const ArticleComment = mongoose.model('ArticleComment', articleCommentSchema);

export default ArticleComment;
