import endpoints from "@/constraints/apiConfig";
import Button from "../../globalComponents/Button";
import axios from "axios";

const PurchaseCard = ({ artwork, onPurchaseClick }) => {
  const handleBuyNow = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${endpoints.postCheckout}/${artwork._id}`,
        {}, // No body required
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.url) {
        window.location.href = response.data.url; // Redirect to Stripe Checkout
      } else {
        alert("Unable to start checkout session.");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="card rounded-xl shadow-xl overflow-hidden flex flex-col h-full">
      {/* Image container with fixed aspect ratio */}
      <div className="relative pt-[100%]">
        <img 
          src={artwork.img} 
          alt={artwork.title} 
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>

      {/* Card content */}
      <div className="p-4 space-y-2 flex-grow flex flex-col">
        <h3 className="text-lg text-[#421983] font-medium line-clamp-1">{artwork.title}</h3>
        <p className="text-sm text-[#FFD700] line-clamp-2 min-h-[2.5rem]">
          {artwork.description} • {artwork.price}
        </p>

        <Button 
          text="Purchase Now" 
          variant="primary" 
          className="w-full mt-4" 
          onClick={handleBuyNow} 
        />

        <Button 
          text="View Details" 
          variant="secondary" 
          className="w-full mt-2 bg-yellow-500 hover:bg-yellow-600 text-white"
          onClick={() => onPurchaseClick(artwork)} 
        />
      </div>
    </div>
  );
};

export default PurchaseCard;