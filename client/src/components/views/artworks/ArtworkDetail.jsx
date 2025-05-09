import { useState, useEffect, useCallback } from "react";
import { FaPaperPlane, FaReply, FaTimes } from "react-icons/fa";
import Button from "../../globalComponents/Button";
import RelatedWorkCard from "./RelatedWorkCard";
import { IoMdQrScanner } from "react-icons/io";
import PlaceBidModal from "./PlaceBidModal";
import axios from "axios";
import endpoints from "../../../constraints/apiConfig";
import Loader from "../../loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import imagePath from "../../../constraints/imagepath";

const ArtworkDetail = () => {
  const location = useLocation();
  const { artworkId } = location.state || {};
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [highestBid, setHighestBid] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [relatedArtworks, setRelatedArtworks] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [comments, setComments] = useState([]);
  const [commentLoading, setCommentLoading] = useState(false);
  const [replyLoading, setReplyLoading] = useState(false);
  const navigate = useNavigate();

  // Calculate time remaining until auction ends
  const calculateTimeLeft = useCallback(() => {
    if (!artwork?.expiresAt) return;

    const difference = new Date(artwork.expiresAt) - new Date();
    
    if (difference > 0) {
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    } else {
      // Auction has ended
      setTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      });
    }
  }, [artwork]);

  // Fetch artwork details with comments and replies
  const fetchArtworkDetails = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${endpoints.getbyId}/${artworkId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setArtwork(response.data.data);
        setHighestBid(response.data.data.currentBid || 0);
        setComments(response.data.data.comments || []);
      } else {
        setError("Failed to fetch artwork details.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching artwork details.");
    } finally {
      setLoading(false);
    }
  }, [artworkId]);

  useEffect(() => {
    if (artworkId) {
      fetchArtworkDetails();
    } else {
      setError("No artwork ID provided.");
      setLoading(false);
    }
  }, [artworkId, fetchArtworkDetails]);

  // Fetch related artworks
  useEffect(() => {
    if (artwork?.category) {
      const fetchRelatedArtworks = async () => {
        try {
          setLoadingRelated(true);
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${endpoints.getbyCategroy}/${artwork.category}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.success) {
            const filtered = response.data.data.filter(
              item => item._id !== artworkId
            );
            setRelatedArtworks(filtered.slice(0, 4));
          }
        } catch (err) {
          console.error("Error fetching related artworks:", err);
        } finally {
          setLoadingRelated(false);
        }
      };

      fetchRelatedArtworks();
    }
  }, [artwork, artworkId]);

  // Set up the timer interval
  useEffect(() => {
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const handlePlaceBid = async (bidAmount) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${endpoints.bidpost}`,
        {
          artworkId: artworkId,
          bidAmount: bidAmount
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        if (bidAmount > highestBid) {
          setHighestBid(bidAmount);
        }
        return { success: true, message: response.data.message };
      } else {
        return { success: false, message: response.data.message || "Failed to place bid." };
      }
    } catch (err) {
      console.error(err);
      return { 
        success: false, 
        message: err.response?.data?.message || "An error occurred while placing bid." 
      };
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    
    try {
      setCommentLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        endpoints.postartWorkComment,
        {
          artworkId: artworkId,
          text: newComment
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        await fetchArtworkDetails();
        setNewComment("");
      }
    } catch (err) {
      console.error("Error adding comment:", err);
      setError("Failed to add comment. Please try again.");
    } finally {
      setCommentLoading(false);
    }
  };

  const handleAddReply = async (parentId) => {
    if (!replyText.trim()) return;
    
    try {
      setReplyLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        endpoints.postartWorkComment,
        {
          artworkId: artworkId,
          text: replyText,
          parentId: parentId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        await fetchArtworkDetails();
        setReplyText("");
        setReplyingTo(null);
      }
    } catch (err) {
      console.error("Error adding reply:", err);
      setError("Failed to add reply. Please try again.");
    } finally {
      setReplyLoading(false);
    }
  };

  const startReply = (commentId) => {
    setReplyingTo(commentId);
    setReplyText("");
  };

  const cancelReply = () => {
    setReplyingTo(null);
    setReplyText("");
  };

  const formatTimeLeft = () => {
    if (timeLeft.days > 0) {
      return `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m`;
    }
    if (timeLeft.hours > 0) {
      return `${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`;
    }
    if (timeLeft.minutes > 0) {
      return `${timeLeft.minutes}m ${timeLeft.seconds}s`;
    }
    if (timeLeft.seconds > 0) {
      return `${timeLeft.seconds}s`;
    }
    return "Auction ended";
  };

  const renderComment = (comment) => (
    <div key={comment._id} className="flex gap-3 items-start">
      {comment.user?.profilePic ? (
        <img
          src={`${imagePath}${comment.user.profilePic}`}
          alt={comment.user.username}
          className="size-10 object-cover rounded-full"
        />
      ) : (
        <div className="size-10 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-sm">
            {comment.user?.username?.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
      <div className="flex-1">
        <div className="bg-gray-100 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <h4 className="font-medium">{comment.user?.username || 'Anonymous'}</h4>
            <span className="text-xs text-gray-500">
              {new Date(comment.createdAt).toLocaleString()}
            </span>
          </div>
          <p className="mt-1 text-gray-800">{comment.text}</p>
          
          <div className="mt-2 flex justify-end">
            <button 
              onClick={() => startReply(comment._id)}
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
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#421983]"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddReply(comment._id)}
            />
            <button
              onClick={() => handleAddReply(comment._id)}
              disabled={replyLoading || !replyText.trim()}
              className="px-3 py-2 bg-[#421983] text-white rounded-md hover:bg-[#5a2da8] transition disabled:opacity-50"
            >
              {replyLoading ? 'Posting...' : <FaPaperPlane />}
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
                {reply.user?.profilePic ? (
                  <img
                    src={`${imagePath}${reply.user.profilePic}`}
                    alt={reply.user.username}
                    className="size-8 object-cover rounded-full"
                  />
                ) : (
                  <div className="size-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-xs">
                      {reply.user?.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="flex-1">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium">{reply.user?.username || 'Anonymous'}</h4>
                      <span className="text-xs text-gray-500">
                        {new Date(reply.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-800">{reply.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Loader /></div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-8">{error}</div>;
  }

  if (!artwork) {
    return <div className="text-center p-8">No artwork data found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="relative bg-gray-100 p-8 rounded-xl">
              <div className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-md">
                <IoMdQrScanner className="text-2xl text-gray-700" />
              </div>
              <img
                src={`${imagePath}${artwork.images[0]}`}
                alt={artwork.title}
                className="w-full h-auto max-h-[500px] object-contain rounded-lg"
              />
            </div>
          </div>

          {artwork.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {artwork.images.slice(1).map((image, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <img
                    src={`${imagePath}${image}`}
                    alt={`${artwork.title} thumbnail ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h1 className="text-3xl font-bold text-purple-900 mb-2">{artwork.title}</h1>
            <p className="text-orange-500 font-medium mb-4">by {artwork.createdBy.username}</p>
            <p className="text-gray-600">{artwork.description}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Current Highest Bid</span>
              <span className="text-xl font-bold text-yellow-600">${highestBid.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Auction Ends In</span>
              <span className={`font-medium ${
                timeLeft.days === 0 && timeLeft.hours < 24 
                  ? 'text-red-600 animate-pulse' 
                  : 'text-purple-900'
              }`}>
                {formatTimeLeft()}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <input
              type="number"
              placeholder="Enter your bid amount"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              min={highestBid + (artwork.minIncrement || 10)}
            />
            <Button
              text="Place Bid"
              variant="primary"
              className="w-full py-3"
              onClick={() => setIsModalOpen(true)}
              disabled={timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0}
            />
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Bid History</h3>
            {artwork.bids && artwork.bids.length > 0 ? (
              <div className="space-y-3">
                {artwork.bids.map((bid) => (
                  <div key={bid._id} className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      {bid.user?.profilePic ? (
                        <img 
                          src={`${imagePath}${bid.user.profilePic}`} 
                          alt={bid.user.username} 
                          className="size-8 rounded-full object-cover" 
                        />
                      ) : (
                        <div className="size-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs font-medium">
                            {bid.user?.username?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <span className="font-medium">{bid.user?.username || 'Anonymous'}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${bid.bidAmount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(bid.bidTime).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 py-4 text-center">No bids yet</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Comments</h2>
        
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Share your thoughts about this artwork..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
          />
          <button
            onClick={handleAddComment}
            disabled={commentLoading || !newComment.trim()}
            className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition disabled:opacity-50 flex items-center gap-2"
          >
            {commentLoading ? 'Posting...' : (
              <>
                <FaPaperPlane /> Post
              </>
            )}
          </button>
        </div>
        
        <div className="space-y-6">
          {comments.length > 0 ? (
            comments.map(renderComment)
          ) : (
            <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Artworks</h2>
        {loadingRelated ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : relatedArtworks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedArtworks.map((artwork) => (
              <RelatedWorkCard
                key={artwork._id}
                img={`${imagePath}${artwork.images[0]}`}
                title={artwork.title}
                description="Current Bid"
                price={`$${(artwork.currentBid || artwork.startingBid).toLocaleString()}`}
                onClick={() => navigate('/artworkDetail', { state: { artworkId: artwork._id } })}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No related artworks found</p>
        )}
      </div>

      {/* Bid Modal - Only render when isModalOpen is true */}
      {isModalOpen && (
        <PlaceBidModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          highestBid={highestBid}
          bidAmount={bidAmount}
          setBidAmount={setBidAmount}
          handlePlaceBid={handlePlaceBid}
          minIncrement={artwork.minIncrement || 10}
          auctionEnded={timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0}
        />
      )}
    </div>
  );
};

export default ArtworkDetail;