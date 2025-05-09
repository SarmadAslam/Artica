import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import imagePath from '../constraints/imagepath';
import Loader from './loader/Loader';
import Footer from './globalComponents/Footer';
import endpoints from '@/constraints/apiConfig';

const AllStories = () => {
  const [stories, setStories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const storiesPerPage = 6;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch(endpoints.getAllarticles);
        const data = await response.json();

        if (data.success) {
          setStories(data.data);
          const uniqueCategories = [...new Set(data.data.map(article => article.category))];
          setCategories(['all', ...uniqueCategories]);
        } else {
          console.error("Failed to fetch articles");
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <div><Loader /></div>;

  const filteredStories = stories
    .filter(story => {
      const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            story.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || story.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = filteredStories.slice(indexOfFirstStory, indexOfLastStory);
  const totalPages = Math.ceil(filteredStories.length / storiesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8 font-sans">
        
        {/* Back Button */}
        <div className="mb-6">
        <button
  onClick={() => navigate(-1)}
  className="absolute  ml-20 left-6 top-6 bg-white border border-[#421983] text-[#421983] hover:bg-[#421983] hover:text-white font-medium px-4 py-2 rounded-full shadow-md flex items-center transition duration-300"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
      clipRule="evenodd"
    />
  </svg>
  Back
</button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#421983] mb-6">Explore Articles</h1>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="relative w-full md:w-64 order-2 md:order-1">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#421983]"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <svg
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
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
            
            <div className="flex flex-col sm:flex-row items-center gap-4 order-1 md:order-2">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#421983]"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSortBy('newest')}
                  className={`px-3 py-2 rounded-md ${sortBy === 'newest' ? 'bg-[#f35e21] text-white' : 'text-gray-700 hover:bg-gray-200'}`}
                >
                  Newest
                </button>
                <button
                  onClick={() => setSortBy('oldest')}
                  className={`px-3 py-2 rounded-md ${sortBy === 'oldest' ? 'bg-[#f35e21] text-white' : 'text-gray-700 hover:bg-gray-200'}`}
                >
                  Oldest
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200"></div>
        </div>
        
        {/* Stories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentStories.length > 0 ? (
            currentStories.map((story) => (
              <div key={story._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={`${imagePath}${story.coverImage}`}
                  alt={story.title}
                  className="w-full h-72 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[#421983] mb-4">{story.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                    {story.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">
                      {story.author && story.author.username ? story.author.username : "Unknown Author"}
                    </span>
                    <Link 
                      to={`/ArtArticlePage/${story._id}`} 
                      className="text-[#421983] font-semibold hover:underline"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-xl text-gray-600">No articles found matching your criteria</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center gap-1">
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-md text-gray-700 hover:bg-[#f35e21] hover:text-white disabled:opacity-50 transition-colors"
              >
                &lt;
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 rounded-md ${currentPage === number 
                    ? 'bg-[#f35e21] text-white' 
                    : 'text-gray-700 hover:bg-gray-200'}`}
                >
                  {number}
                </button>
              ))}
              
              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-md text-gray-700 hover:bg-[#f35e21] hover:text-white disabled:opacity-50 transition-colors"
              >
                &gt;
              </button>
            </nav>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default AllStories;
