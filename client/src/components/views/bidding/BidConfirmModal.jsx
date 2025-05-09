import { useState } from "react";
import { IoIosClose, IoMdInformationCircle } from "react-icons/io";
import Button from "../../globalComponents/Button";
import imagePath from "../../../constraints/imagepath";
import axios from "axios";
import endpoints from "../../../constraints/apiConfig";
import { toast } from "react-toastify";
import Loader from "../../loader/Loader";

const BidConfirmModal = ({ 
  isOpen, 
  onClose, 
  selectedArtwork,
  artworkId,
  currentHighestBid,
  minIncrement,
  onBidSuccess
}) => {
  const [bidAmount, setBidAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);

  if (!isOpen) return null;

  const handleBidSubmit = async () => {
    if (!bidAmount) {
      setError("Please enter a bid amount");
      return;
    }

    const amount = Number(bidAmount);
    const minBid = currentHighestBid + minIncrement;

    if (amount < minBid) {
      setError(`Bid must be at least $${minBid}`);
      return;
    }

    if (!termsAgreed) {
      setError("You must agree to the terms and conditions");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        endpoints.bidpost,
        {
          artworkId: artworkId,
          bidAmount: amount
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Bid placed successfully!");
        onBidSuccess(amount);
        onClose();
      } else {
        setError(response.data.message || "Failed to place bid.");
        toast.error(response.data.message || "Failed to place bid.");
      }
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || "An error occurred while placing bid.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setBidAmount(value);
    setError("");
  };

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-sm overflow-hidden">
        <div className="flex items-center gap-3 p-6 bg-[#421983] relative">
          <div className="size-16 -mt-3">
            <img 
              src={imagePath + selectedArtwork?.img} 
              alt={selectedArtwork?.title} 
              className="size-full object-cover rounded-lg mt-2" 
            />
          </div>
          <h2 className="text-lg font-semibold text-white">{selectedArtwork?.title}</h2>
          <button 
            onClick={onClose} 
            className="text-3xl absolute top-2 right-2 text-white hover:text-gray-200"
            disabled={loading}
          >
            <IoIosClose />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="">
            <p className="text-[#4B5563]">Current Highest Bid</p>
            <p className="text-[#FFD700] text-3xl font-bold">
              ${currentHighestBid?.toLocaleString()}
            </p>
          </div>
          
          <div className="text-[#4B5563] space-y-1">
            <p>Your Bid Amount</p>
            <div className={`border py-2 px-8 rounded-md relative ${
              error ? "border-[#DC2626]" : "border-gray-300"
            }`}>
              <span className="absolute text-lg font-medium top-1 left-3">$</span>
              <input 
                type="text" 
                placeholder="Enter bid amount" 
                className="outline-none w-full"
                value={bidAmount}
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>
            
            <p className="flex items-center gap-2 text-sm">
              <span className="text-[#421983]"><IoMdInformationCircle /></span> 
              Minimum bid increment: ${minIncrement}
            </p>
            
            <div className="flex items-center gap-2 mt-2">
              <input 
                type="checkbox" 
                id="termsAgreement"
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
                disabled={loading}
                className="rounded text-[#421983] focus:ring-[#421983]"
              />
              <label htmlFor="termsAgreement" className="text-sm">
                I agree to the bidding terms and conditions
              </label>
            </div>
            
            {error && (
              <p className="text-[#DC2626] text-sm mt-1">{error}</p>
            )}
          </div>
        
          <div className="mt-4 grid grid-cols-2 gap-4">
            <Button 
              text={loading ? <Loader size="small" /> : "Confirm Bid"} 
              variant="primary" 
              className="w-full" 
              onClick={handleBidSubmit}
              disabled={loading}
            />
            <Button 
              text="Cancel" 
              variant="outline" 
              className="w-full !border-[#421983] !text-[#421983]" 
              onClick={onClose}
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidConfirmModal;