import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import imagePath from "../../constraints/imagepath";
import endpoints from "@/constraints/apiConfig";

const ArtworkCard = ({ img, title, description, year, onDelete, id }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const displayYear = new Date(year).getFullYear();

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleDeleteClick = async (e) => {
    e.stopPropagation();
    setIsDeleting(true);
    
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await fetch(`${endpoints.deleteArtwork}/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to delete artwork");
      }
      onDelete();
    } catch (error) {
      console.error("Error deleting artwork:", error);
      alert("Failed to delete artwork. Please try again.");
    } finally {
      setIsDeleting(false);
      setShowMenu(false);
    }
  };

  return (
    <div className="card rounded-xl shadow-xl relative">
      {/* Menu Button */}
      <div className="absolute top-4 right-4 text-[#4B5563] flex items-center gap-2">
        <span className='rounded-full bg-white px-2 py-2.5 shadow-xl cursor-pointer'>
          <button 
            onClick={handleMenuClick}
            className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
            disabled={isDeleting}
          >
            <FaEllipsisV className="text-gray-500" />
          </button>
          
          {showMenu && (
            <div 
              className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleDeleteClick}
                className={`block w-full text-left px-4 py-2 text-sm ${isDeleting ? 'text-gray-400' : 'text-red-600 hover:bg-red-50'} rounded-md`}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          )}
        </span>
      </div>

      <div>
        <img 
          src={`${imagePath}${img}`} 
          alt={title} 
          className='size-full rounded-t-xl object-cover'
        />
      </div>

      <div className="p-3">
        <h3 className='text-lg font-medium'>{title}</h3>
        <div className="flex justify-between">
          <p className='text-s text-[#4B5563]'>{description}</p>
          <p className='text-s text-[#4B5563]'> • {displayYear}</p>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;