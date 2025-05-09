import { useState } from "react";
import Button from "../../globalComponents/Button";
import { IoIosClose, IoIosCloseCircle, IoMdInformationCircle } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";

const PlaceBidModal = ({ 
  isOpen,
  onClose, 
  highestBid, 
  bidAmount, 
  setBidAmount, 
  handlePlaceBid,
  minIncrement,
  auctionEnded
}) => {
  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (auctionEnded) {
      setMessage({ type: "error", text: "This auction has already ended." });
      return;
    }

    if (!bidAmount || isNaN(bidAmount)) {
      setMessage({ type: "error", text: "Please enter a valid bid amount." });
      return;
    }

    const amount = Number(bidAmount);
    const minimumBid = highestBid + minIncrement;
    
    if (amount < minimumBid) {
      setMessage({ 
        type: "error", 
        text: `Your bid must be at least $${minimumBid} (current bid + minimum increment).` 
      });
      return;
    }

    setIsSubmitting(true);
    const result = await handlePlaceBid(amount);
    setIsSubmitting(false);

    if (result.success) {
      setMessage({ type: "success", text: result.message });
      setTimeout(() => {
        onClose();
      }, 2000);
    } else {
      setMessage({ type: "error", text: result.message });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-96 p-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-[#421983]">Place Your Bid</h2>
          <button onClick={onClose} className="text-3xl"><IoIosClose /></button>
        </div>
        <div className="space-y-4">
          <div className="mt-4 p-3 rounded-md bg-[#F9FAFB]">
            <p className="text-gray-500">Current Highest Bid</p>
            <p className="text-[#421983] text-xl font-semobold">${highestBid.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">Minimum increment: ${minIncrement}</p>
          </div>
          <div className="text-gray-500 space-y-1">
            <p>Your Bid Amount</p>
            <div className="border py-2 px-8 border-[#F35E21] rounded-md relative">
              <span className="absolute text-lg font-medium top-1 left-3">$</span>
              <input 
                type="number" 
                placeholder={`Enter at least $${highestBid + minIncrement}`} 
                className="outline-none w-full"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                min={highestBid + minIncrement}
              />
            </div>
          </div>

          {message && (
            <p className={`flex items-center gap-2 text-sm ${
              message.type === "success" 
                ? "text-[#059669] bg-[#ECFDF5]" 
                : "text-[#DC2626] bg-[#FEF2F2]"
            } p-2 rounded-md`}>
              <span className="text-black">
                {message.type === "success" ? <FaCheckCircle /> : <IoIosCloseCircle />}
              </span>
              {message.text}
            </p>
          )}

          <div className="mt-4 grid grid-cols-2 gap-4">
            <Button 
              text={isSubmitting ? "Processing..." : "Confirm Bid"} 
              variant="primary" 
              className="w-full" 
              onClick={handleSubmit}
              disabled={isSubmitting || auctionEnded}
            />
            <Button 
              text="Cancel" 
              variant="outline" 
              className="w-full" 
              onClick={onClose}
              disabled={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceBidModal;