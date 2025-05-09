import { FaRegClock } from "react-icons/fa";
import Button from "../../globalComponents/Button";
import axios from "axios";

const BiddingCard = ({ artwork, onBidNowClick }) => {

  return (
    <div className="card rounded-xl shadow-xl overflow-hidden flex flex-col h-full">
      <div className="relative pt-[100%]"> 
        <img 
          src={artwork.img} 
          alt={artwork.title} 
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>

      <div className="p-4 space-y-2 flex-grow flex flex-col">
        <h3 className="text-lg text-[#421983] font-medium line-clamp-1">{artwork.title}</h3>
        <p className="text-sm text-[#FFD700] line-clamp-2 min-h-[2.5rem]">
          {artwork.description} • ${artwork.price}
        </p>
        <p className="text-sm text-[#6B7280] flex items-center gap-2 mt-auto">
          <span className="text-black"><FaRegClock /></span> 
          Ends in {artwork.day} {artwork.time}
        </p>

        <Button 
          text="Bid Now" 
          variant="primary" 
          className="w-full mt-4" 
          onClick={() => onBidNowClick(artwork)} 
        />

       
      </div>
    </div>
  );
};

export default BiddingCard;
