import { useState } from "react";
import Button from "../../globalComponents/Button";
import axios from "axios";
import { toast } from "react-toastify";
import imagePath from "../../../constraints/imagepath";
import endpoints from "@/constraints/apiConfig";

const PurchaseConfirmModal = ({ 
  isOpen, 
  onClose, 
  selectedArtwork,
  artworkId,
  onPurchaseSuccess
}) => {
  const [loading, setLoading] = useState(false);

  const handleConfirmPurchase = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${endpoints.postCheckout}/${artworkId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.url) {
        window.location.href = response.data.url;
      } else {
        toast.error("Failed to initiate purchase");
      }
    } catch (error) {
      console.error("Purchase error:", error);
      toast.error("Failed to complete purchase");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden w-full max-w-md border border-gray-200 dark:border-gray-700">
        {/* Header with f35e21 color */}
        <div className="bg-[#f35e21] p-6">
          <h2 className="text-2xl font-bold text-white">Confirm Your Purchase</h2>
          <p className="text-orange-100 mt-1">One last step to own this masterpiece</p>
        </div>
        
        {/* Artwork Preview */}
        <div className="p-6">
          <div className="flex items-start gap-5 mb-6">
            <div className="relative flex-shrink-0">
              <img 
                src={`${imagePath}${selectedArtwork.img}`}
                alt={selectedArtwork.title} 
                className="w-24 h-24 object-cover rounded-lg shadow-md border-2 border-white dark:border-gray-700"
              />
              <div className="absolute -bottom-2 -right-2 bg-[#f35e21] text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                ${selectedArtwork.price}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800 dark:text-white">{selectedArtwork.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">Digital Artwork</p>
              <div className="mt-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                High-resolution file
              </div>
            </div>
          </div>

      

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              text="Cancel" 
              variant="secondary" 
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-3"
            />
            <Button 
              text={loading ? "Processing..." : "Confirm Purchase"} 
              variant="primary" 
              onClick={handleConfirmPurchase}
              disabled={loading}
              className="flex-1 py-3 bg-[#f35e21] hover:bg-[#e0551a] text-white"
            />
          </div>
        </div>

        {/* Footer Note */}
        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Your payment is secured with 256-bit SSL encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default PurchaseConfirmModal;