import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import imagePath from '../constraints/imagepath';
import endpoints from '@/constraints/apiConfig';

const MyArticles = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Added for navigation

  const articlesPerPage = 6;

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch(endpoints.getmyArticles, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          setArticles(data.articles || data.data || []);
          const uniqueCategories = [...new Set((data.articles || data.data || []).map(article => article.category))];
          setCategories(['all', ...uniqueCategories]);
        } else {
          throw new Error(data.message || "Failed to fetch my articles");
        }
      } catch (error) {
        console.error("Error fetching my articles:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles = articles
    .filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      return sortBy === 'newest'
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    });

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#421983] mb-6">My Articles</h1>

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="mb-6 flex justify-center">
          <Link
            to="/Dashboard/create-article"
            className="bg-[#421983] text-white px-6 py-2 rounded-md hover:bg-[#5b26b0] transition-colors"
          >
            Create Article
          </Link>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative w-full md:w-64 order-2 md:order-1">
            <input
              type="text"
              placeholder="Search my articles..."
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

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">Loading articles...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentArticles.length > 0 ? (
              currentArticles.map((article) => (
                <div key={article._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {article.coverImage && (
                    <img
                      src={`${imagePath}${article.coverImage}`}
                      alt={article.title}
                      className="w-full h-64 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-[#421983] mb-4">{article.title}</h2>
                    <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {article.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {article.tags?.map((tag, index) => (
                        <span key={index} className="bg-gray-200 px-2 py-1 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">
                        {article.author?.username || "You"}
                      </span>
                      <Link
                        to={`/ArtArticlePage/${article._id}`}
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
                <p className="text-xl text-gray-600">No articles found</p>
              </div>
            )}
          </div>

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
        </>
      )}
    </div>
  );
};

export default MyArticles;