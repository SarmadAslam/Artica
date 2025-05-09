import { IoIosClose } from "react-icons/io";
import Button from "../../globalComponents/Button";
import { useState, useEffect, useCallback } from "react";
import imagePath from "../../../constraints/imagepath";

const BidDetailModal = ({ isOpen, onClose, selectedArtwork, onBidClick, bidDetails = [] }) => {
  if (!isOpen || !selectedArtwork) return null;

  // Get the first image URL
  const firstImage = selectedArtwork.images?.length > 0 
    ? `${imagePath}${selectedArtwork.images[0]}`
    : '';

  // Timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Calculate time remaining until auction ends
  const calculateTimeLeft = useCallback(() => {
    if (!selectedArtwork?.expiresAt) return;

    const difference = new Date(selectedArtwork.expiresAt) - new Date();
    
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
  }, [selectedArtwork]);

  // Format the time left for display
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

  // Set up the timer interval
  useEffect(() => {
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white px-4 py-6 rounded-lg shadow-lg w-[90%] max-w-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#421983]">{selectedArtwork.title}</h2>
          <button onClick={onClose} className="text-3xl"><IoIosClose/></button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="">
            <div className="h-full max-h-[90%]">
              <img 
                src={firstImage} 
                alt={selectedArtwork.title} 
                className="w-full h-full object-cover rounded-lg mt-2" 
              />
            </div>
            <p className="block h-8 mt-3 font-medium text-[#FFD700]">
              By {selectedArtwork.createdBy?.username || 'Unknown Artist'}
            </p>
          </div>
          <div className="space-y-3">
            <div className="space-y-3">
              <h3 className="font-medium text-[#421983]">Description</h3>
              <p className="text-sm">{selectedArtwork.description}</p>
              <p className="text-[#421983] font-medium mt-2">Current Bid</p>
              <p className="text-[#FFD700]">
                ${(selectedArtwork.currentBid || selectedArtwork.startingBid || 0).toLocaleString()}
              </p>
              <p className={`${
                timeLeft.days === 0 && timeLeft.hours < 24 
                  ? 'text-[#DC2626] animate-pulse' 
                  : 'text-gray-500'
              }`}>
                Ends in {formatTimeLeft()}
              </p>
            </div>
            <div className="max-h-40 overflow-y-auto">
              <h4 className="text-[#421983] font-medium mt-2">Bid History</h4>
              {bidDetails.length > 0 ? (
                bidDetails.map((bid) => (
                  <div 
                    key={bid._id} 
                    className="flex items-center justify-between gap-2 py-2 border-b border-gray-200"
                  >
                    <div className="flex items-center gap-2">
                      {bid.user?.profilePic ? (
                        <img 
                          src={`${imagePath}${bid.user.profilePic}`}
                          alt={bid.user.username}
                          className="size-6 object-cover rounded-full"
                        />
                      ) : (
                        <div className="size-6 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-xs">
                            {bid.user?.username?.charAt(0).toUpperCase() || 'A'}
                          </span>
                        </div>
                      )}
                      <h5>{bid.user?.username || 'Anonymous'}</h5>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-[#F35E21]">
                        ${(bid.bidAmount || 0).toLocaleString()}
                      </span>
                      <p className="text-xs text-gray-500">
                        {new Date(bid.bidTime).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 py-2">No bids yet</p>
              )}
            </div>
            <Button 
              text="Place Your Bid" 
              variant="primary" 
              className="w-full mt-4" 
              onClick={onBidClick}
              disabled={timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidDetailModal;