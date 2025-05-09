import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ArticleComment' }],
  tags: [{
    type: String,
    trim: true,
  }],
  coverImage: {
    type: String, 
    required: false,
  },
  articles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
    default: [],
  }],  
  category: {
    type: String,
    required: true,
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // link to user
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Article = mongoose.model('Article', articleSchema);

export default Article;
