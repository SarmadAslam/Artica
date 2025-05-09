import React, { useEffect, useState } from "react";
import imagePath from "../../../constraints/imagepath";
import { Link, useNavigate } from "react-router-dom";
import endpoints from "@/constraints/apiConfig";

const ArtStories = () => {
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(endpoints.getAllarticles);
        const data = await response.json();

        if (data.success) {
          // Take only the first 3 articles
          setStories(data.data.slice(0, 3));
        } else {
          console.error("Failed to fetch articles");
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <>
    <div className="max-w-7xl mx-auto p-6 font-sans">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-[#421983]">Explore Articles</h1>
        <button 
          onClick={() => navigate('/all-art-stories')} // Change this to your desired route
          className="bg-[#f35e21] text-white px-6 py-2 rounded-md hover:bg-[#321263] transition-colors"
        >
          View All Stories
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {stories.map((story, index) => (
    <Link 
      to={`/ArtArticlePage/${story._id}`} 
      key={index} 
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <img
        src={`${imagePath}${story.coverImage}`}
        alt={story.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h2 className="text-xl font-bold text-[#421983] mb-4">{story.title}</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          {story.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-800">
            {story.author && story.author.username ? story.author.username : "Unknown Author"}
          </span>
          <span className="text-[#421983] font-semibold hover:underline">
            Read More
          </span>
        </div>
      </div>
    </Link>
  ))}
</div>

    </div>
    </>
  );
};

export default ArtStories;