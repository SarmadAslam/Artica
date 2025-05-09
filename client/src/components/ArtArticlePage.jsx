import React, { useEffect, useState } from "react";
import Loader from "./loader/Loader";
import { FaPaperPlane, FaReply, FaTimes } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "./globalComponents/Footer";
import endpoints from "@/constraints/apiConfig";
import imagePath from "@/constraints/imagepath";


const ArtArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const navigate = useNavigate();


  // Fetch the article data with comments
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${endpoints.getArticlebyId}/${id}`);
        const data = await response.json();

        if (data.success) {
          setArticle(data.data);
        } else {
          setError("Failed to fetch article");
        }
      } catch (error) {
        setError("Error fetching article");
        console.error("Error fetching article:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      
      const response = await fetch(endpoints.postComment, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          articleId: id,
          content: commentContent,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Refresh the article to get the new comment
        const articleResponse = await fetch(`${endpoints.getArticlebyId}/${id}`);
        const articleData = await articleResponse.json();
        
        if (articleData.success) {
          setArticle(articleData.data);
          setCommentContent("");
        }
      } else {
        setError(data.message || "Failed to post comment");
      }
    } catch (error) {
      setError("Error posting comment");
      console.error("Error posting comment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReplySubmit = async (parentCommentId) => {
    if (!replyContent.trim()) return;

    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      
      const response = await fetch(endpoints.postComment, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          articleId: id,
          content: replyContent,
          parentCommentId: parentCommentId
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Refresh the article to get the new reply
        const articleResponse = await fetch(`${endpoints.getArticlebyId}/${id}`);
        const articleData = await articleResponse.json();
        
        if (articleData.success) {
          setArticle(articleData.data);
          setReplyContent("");
          setReplyingTo(null);
        }
      } else {
        setError(data.message || "Failed to post reply");
      }
    } catch (error) {
      setError("Error posting reply");
      console.error("Error posting reply:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const startReply = (comment) => {
    setReplyingTo(comment._id);
    setReplyContent("");
  };

  const cancelReply = () => {
    setReplyingTo(null);
    setReplyContent("");
  };

  const renderComment = (comment) => (
    <div key={comment._id} className="flex gap-3 items-start">
      {comment.author?.profilePic ? (
        <img
          src={`${imagePath}${comment.author.profilePic}`}
          alt={comment.author.username}
          className="w-10 h-10 object-cover rounded-full"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-sm">
            {comment.author?.username?.charAt(0).toUpperCase() || "U"}
          </span>
        </div>
      )}
      <div className="flex-1">
        <div className="bg-gray-100 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <h4 className="font-medium">{comment.author?.username || 'Anonymous'}</h4>
            <span className="text-xs text-gray-500">
              {new Date(comment.createdAt).toLocaleString()}
            </span>
          </div>
          <p className="mt-1 text-gray-800">{comment.content}</p>
          
          <div className="mt-2 flex justify-end">
            <button 
              onClick={() => startReply(comment)}
              className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1"
            >
              <FaReply size={10} /> Reply
            </button>
          </div>
        </div>

        {replyingTo === comment._id && (
          <div className="mt-3 ml-8 flex gap-2">
            <input
              type="text"
              placeholder="Write a reply..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleReplySubmit(comment._id)}
            />
            <button
              onClick={() => handleReplySubmit(comment._id)}
              disabled={isLoading || !replyContent.trim()}
              className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isLoading ? 'Posting...' : <FaPaperPlane />}
            </button>
            <button
              onClick={cancelReply}
              className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
            >
              <FaTimes />
            </button>
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 ml-8 space-y-3">
            {comment.replies.map(reply => (
              <div key={reply._id} className="flex gap-3 items-start">
                {reply.author?.profilePic ? (
                  <img
                    src={`${imagePath}${reply.author.profilePic}`}
                    alt={reply.author.username}
                    className="w-8 h-8 object-cover rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-xs">
                      {reply.author?.username?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                )}
                <div className="flex-1">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium">{reply.author?.username || 'Anonymous'}</h4>
                      <span className="text-xs text-gray-500">
                        {new Date(reply.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-800">{reply.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (!article && isLoading) {
    return <div><Loader/></div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  if (!article) {
    return <div className="p-6">Article not found</div>;
  }

  return (

    <>
     <div className="p-6 font-sans">

     <div className="mb-16">
        <button
  onClick={() => navigate(-1)}
  className="absolute   ml-20 left-6 top-6 bg-white border border-[#421983] text-[#421983] hover:bg-[#421983] hover:text-white font-medium px-4 py-2 rounded-full shadow-md flex items-center transition duration-300"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
      clipRule="evenodd"
    />
  </svg>
  Back
</button>
        </div>

      {article.coverImage && (
        <img
          src={`${imagePath}${article.coverImage}`}
          alt={article.title}
          className="w-full h-full object-cover mb-6"
        />
      )}

      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
          <div className="flex items-center text-gray-600">
            {article.author?.profilePic && (
              <img 
                src={`${imagePath}${article.author.profilePic}`} 
                alt={article.author.username}
                className="w-6 h-6 rounded-full mr-2"
              />
            )}
            <span className="font-medium">
              {article.author?.username || "Unknown Author"}
            </span>
            <span className="mx-2">|</span>
            <span>
              {new Date(article.publishedDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Article Content */}
        <div className="mb-10">
          <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 mb-6">
            {article.content}
          </blockquote>
        </div>

        {/* Comments Section */}
        <div className="border-t pt-6">
          <h3 className="text-xl font-medium mb-4">Comments ({article.comments?.length || 0})</h3>
          
          {/* Comment Form */}
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="Share your thoughts about this article..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit(e)}
            />
            <button
              onClick={handleCommentSubmit}
              disabled={isLoading || !commentContent.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? 'Posting...' : (
                <>
                  <FaPaperPlane /> Post
                </>
              )}
            </button>
          </div>
          
          {/* Comments List */}
          <div className="space-y-6">
            {article.comments && article.comments.length > 0 ? (
              article.comments.map(renderComment)
            ) : (
              <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
            )}
          </div>
        </div>
      </div>
    </div>

    <Footer/>
    
    </>

   
  );
};

export default ArtArticlePage;