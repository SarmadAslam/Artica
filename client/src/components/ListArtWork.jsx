import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaPenNib, FaArrowLeft } from "react-icons/fa";
import Button from "./globalComponents/Button";
import ArtworkCard from "./globalComponents/ArtworkCard";
import axios from "axios";
import endpoints from "../constraints/apiConfig";
import Loader from "./loader/Loader";
import imagePath from "../constraints/imagepath";

const ListArtWork = () => {
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(endpoints.getprofile, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPortfolio(response.data.user.showartWork || []);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Error loading artworks. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddNewClick = () => {
    navigate("/Dashboard/artworkForm");
  };

  const handleArticlesClick = () => {
    navigate("/myArticles");
  };

  const handleBackClick = () => {
    navigate("/Dashboard");
  };

  const handleArtworkClick = (artwork) => {
    navigate(`/artworkDetail`, { state: { artworkId: artwork._id } });
  };

  const handleDeleteArtwork = async (artworkId) => {
    if (!window.confirm("Are you sure you want to delete this artwork?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${endpoints.deleteArt}/${artworkId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPortfolio(portfolio.filter(artwork => artwork._id !== artworkId));
      alert("Artwork deleted successfully");
    } catch (err) {
      console.error("Error deleting artwork:", err);
      alert("Failed to delete artwork. Please try again.");
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-red-500 p-8">{error}</div>;

  return (
    <div className="w-[90%] mx-auto mb-4 pt-4">
      {/* Back Button */}
      <div className="mb-4">
        <button 
          onClick={handleBackClick}
          className="flex items-center gap-2 text-purple-800 hover:text-purple-600 transition-colors"
        >
          <FaArrowLeft className="text-lg" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Artwork Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-purple-800">My Artworks</h2>
          <div className="flex gap-4">
            <Button
              text="My Articles"
              icon={FaPenNib}
              onClick={handleArticlesClick}
              variant="secondary"
              className="!rounded-full text-purple-700 border border-purple-300"
            />
            <Button
              text="Add New Artwork"
              variant="primary"
              icon={FaPlus}
              onClick={handleAddNewClick}
              className="!rounded-full"
            />
          </div>
        </div>

        {portfolio.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.map((artwork, index) => (
              <div
                key={index}
                onClick={() => handleArtworkClick(artwork)}
                className="cursor-pointer hover:transform hover:scale-105 transition-transform duration-200"
              >
                <ArtworkCard
                  img={`${artwork.images[0]}`}
                  title={artwork.title}
                  description={artwork.description}
                  year={new Date(artwork.createdAt).getFullYear()}
                  bidAmount={artwork.currentBid || artwork.startingBid}
                  onDelete={(e) => {
                    e.stopPropagation();
                    handleDeleteArtwork(artwork._id);
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-purple-50 rounded-lg p-8 text-center">
            <p className="text-gray-600 mb-4">You haven't added any artworks yet.</p>
            <Button
              text="Add Your First Artwork"
              variant="primary"
              icon={FaPlus}
              onClick={handleAddNewClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListArtWork;