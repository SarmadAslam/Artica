import { useState, useEffect, useCallback } from "react";
import Dropdown from "../../globalComponents/Dropdown";
import PurchaseCard from "./PurchaseCard";
import PurchaseConfirmModal from "./PurchaseConfirmModal";
import axios from "axios";
import Loader from "../../loader/Loader";
import endpoints from "../../../constraints/apiConfig";
import imagePath from "../../../constraints/imagepath";
import { toast } from "react-toastify";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Purchase = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedTag, setSelectedTag] = useState("All Tags");
  const [sortOption, setSortOption] = useState("Newest");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000);

  const purchaseOptions = ["All Categories", "Landscape", "Abstract", "Portrait"];
  const purchaseTags = ["All Tags", "Popular", "Trending", "New Arrivals"];
  const sortOptions = ["Newest", "Price: High to Low", "Price: Low to High"];

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  // Fetch artworks from API
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(endpoints.getAllpurchaseartWorks);

        if (response.data.success) {
          const availableArtworks = response.data.data.filter(
            artwork => artwork.availableForPurchase
          );
          
          // Calculate max price
          const maxArtworkPrice = Math.max(
            ...availableArtworks.map(artwork => artwork.price || 0),
            1000
          );
          
          setMaxPrice(Math.ceil(maxArtworkPrice / 100) * 100);
          setPriceRange([0, Math.ceil(maxArtworkPrice / 100) * 100]);
          
          setArtworks(availableArtworks);
          setFilteredArtworks(availableArtworks);
        } else {
          setError("Failed to fetch artworks");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching artworks");
        toast.error("Failed to load artworks");
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  // Filter and sort artworks
  useEffect(() => {
    if (artworks.length === 0) return;

    let result = [...artworks];

    // Apply search filter
    if (debouncedQuery) {
      const queries = debouncedQuery
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .filter(q => q.length > 0);

      if (queries.length > 0) {
        result = result.filter(artwork => {
          const searchFields = [
            artwork.title?.toLowerCase() || "",
            artwork.description?.toLowerCase() || "",
            artwork.category?.toLowerCase() || "",
            artwork.artist?.name?.toLowerCase() || ""
          ];

          return queries.every(q => 
            searchFields.some(field => field.includes(q))
          );
        });
      }
    }

    // Filter by category
    if (selectedCategory !== "All Categories") {
      result = result.filter(artwork => artwork.category === selectedCategory);
    }

    // Filter by price range
    result = result.filter(artwork => {
      const price = artwork.price || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sort artworks
    switch (sortOption) {
      case "Newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "Price: High to Low":
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "Price: Low to High":
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      default:
        break;
    }

    setFilteredArtworks(result);
  }, [artworks, debouncedQuery, selectedCategory, priceRange, sortOption]);

  const handlePurchaseClick = (artwork) => {
    setSelectedArtwork(artwork);
    setIsConfirmOpen(true);
  };

  const handlePurchaseSuccess = () => {
    toast.success("Purchase completed successfully!");
    setIsConfirmOpen(false);
  };

  if (loading && artworks.length === 0) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-center text-red-500 p-8">{error}</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Filter Section */}
      <div className="py-6 bg-[#F35E21] text-white  top-0 z-10">
        <div className="w-[90%] mx-auto flex flex-wrap items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              placeholder="Search artworks by title, description, artist or category..."
              className="w-full p-2 pl-10 bg-white text-black rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute left-3 top-3 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          
          <Dropdown 
            defaultOption="All Categories" 
            options={purchaseOptions} 
            selectedValue={selectedCategory} 
            onChange={setSelectedCategory} 
            className="min-w-[180px]"
          />
          
          {/* Price Range Slider */}
          <div className="flex-grow max-w-xs">
            <div className="bg-white p-3 rounded-lg">
              <div className="text-black text-sm mb-1">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </div>
              <Slider
                range
                min={0}
                max={maxPrice}
                step={10}
                defaultValue={[0, maxPrice]}
                value={priceRange}
                onChange={(value) => setPriceRange(value)}
                trackStyle={[{ backgroundColor: "#F35E21" }]}
                handleStyle={[
                  { backgroundColor: "#F35E21", borderColor: "#F35E21" },
                  { backgroundColor: "#F35E21", borderColor: "#F35E21" }
                ]}
                railStyle={{ backgroundColor: "#e5e7eb" }}
              />
            </div>
          </div>
          
          <Dropdown 
            defaultOption="All Tags" 
            options={purchaseTags} 
            selectedValue={selectedTag} 
            onChange={setSelectedTag} 
            className="min-w-[120px]"
          />
          
          {sortOptions.map(option => (
            <button
              key={option}
              className={`py-2 px-4 rounded-lg ${
                sortOption === option 
                  ? "bg-white text-[#F35E21] font-bold" 
                  : "bg-transparent border border-white"
              }`}
              onClick={() => setSortOption(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Artworks Grid */}
      <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-12">
        {filteredArtworks.length > 0 ? (
          filteredArtworks.map((artwork) => (
            <PurchaseCard 
              key={artwork._id} 
              artwork={{
                _id: artwork._id,
                img: artwork.images?.[0] ? `${imagePath}${artwork.images[0]}` : '',
                title: artwork.title || 'Untitled',
                description: artwork.category || 'No category',
                price: `$${(artwork.price || 0).toLocaleString()}`
              }} 
              onPurchaseClick={() => handlePurchaseClick(artwork)} 
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-xl text-gray-500">
              {debouncedQuery ? 
                "No artworks found matching your search criteria" : 
                "No artworks available for purchase"}
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedArtwork && (
        <PurchaseConfirmModal 
          isOpen={isConfirmOpen} 
          onClose={() => setIsConfirmOpen(false)} 
          selectedArtwork={{
            img: selectedArtwork.images?.[0] || '',
            title: selectedArtwork.title || 'Untitled',
            price: selectedArtwork.price || 0
          }}
          artworkId={selectedArtwork._id}
          onPurchaseSuccess={handlePurchaseSuccess}
        />
      )}
    </div>
  );
};

export default Purchase;