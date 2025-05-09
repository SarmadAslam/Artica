import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imagePath from "../constraints/imagepath";
import Loader from "./loader/Loader";
import Footer from "./globalComponents/Footer";
import endpoints from "@/constraints/apiConfig";

const AllArtists = () => {
  const [artists, setArtists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedRole, setSelectedRole] = useState("all");
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const artistsPerPage = 6;

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        const response = await fetch(endpoints.getAllUsers);
        const data = await response.json();

        if (data.success) {
          // Filter out users with profile pictures or skills
          const filteredArtists = data.users.filter(
            (user) => user.profilePic || (user.skills && user.skills.length > 0)
          );
          setArtists(filteredArtists);
          
          // Extract unique roles
          const uniqueRoles = [...new Set(filteredArtists.map(artist => artist.role || "Other"))];
          setRoles(["all", ...uniqueRoles]);
        } else {
          console.error("Failed to fetch artists");
        }
      } catch (error) {
        console.error("Error fetching artists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const filteredArtists = artists
    .filter((artist) => {
      const matchesSearch = 
        artist.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.about?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (artist.skills && artist.skills.some(skill => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        ));
      
      const matchesRole = selectedRole === "all" || 
                         (artist.role === selectedRole) || 
                         (selectedRole === "Other" && !artist.role);
      
      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

  const indexOfLastArtist = currentPage * artistsPerPage;
  const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
  const currentArtists = filteredArtists.slice(indexOfFirstArtist, indexOfLastArtist);
  const totalPages = Math.ceil(filteredArtists.length / artistsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8 font-sans">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="absolute ml-20 left-6 top-6 bg-white border border-[#421983] text-[#421983] hover:bg-[#421983] hover:text-white font-medium px-4 py-2 rounded-full shadow-md flex items-center transition duration-300"
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
          <h1 className="text-4xl font-bold text-[#421983] mb-6">Explore Artists</h1>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="relative w-full md:w-64 order-2 md:order-1">
              <input
                type="text"
                placeholder="Search artists..."
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
                value={selectedRole}
                onChange={(e) => {
                  setSelectedRole(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#421983]"
              >
                {roles.map(role => (
                  <option key={role} value={role}>
                    {role === "all" ? "All Roles" : role}
                  </option>
                ))}
              </select>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSortBy("newest")}
                  className={`px-3 py-2 rounded-md ${sortBy === "newest" ? 'bg-[#f35e21] text-white' : 'text-gray-700 hover:bg-gray-200'}`}
                >
                  Newest
                </button>
                <button
                  onClick={() => setSortBy("oldest")}
                  className={`px-3 py-2 rounded-md ${sortBy === "oldest" ? 'bg-[#f35e21] text-white' : 'text-gray-700 hover:bg-gray-200'}`}
                >
                  Oldest
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200"></div>
        </div>
        
        {/* Artists Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {currentArtists.length > 0 ? (
            currentArtists.map((artist) => (
              <div key={artist._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-72 bg-gray-200">
                  {artist.profilePic ? (
                    <img
                      src={`${imagePath}${artist.profilePic}`}
                      alt={artist.username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[#421983] mb-2">
                    {artist.username}
                  </h2>
                  <p className="text-gray-600 mb-2">{artist.role || "Artist"}</p>
                  
                  {artist.about && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {artist.about}
                    </p>
                  )}

                  {artist.skills && artist.skills.length > 0 && (
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-800 mb-1">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {artist.skills.slice(0, 3).map((skill, index) => (
                          <span 
                            key={index} 
                            className="bg-[#f0e6ff] text-[#421983] px-3 py-1 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                        {artist.skills.length > 3 && (
                          <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs">
                            +{artist.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center mt-4">
                    <Link
                      to={`/artist-profile/${artist._id}`}
                      className="text-[#421983] font-semibold hover:underline"
                    >
                      View Profile
                    </Link>
                    
                    <div className="flex space-x-2">
                      {artist.socialLinks?.map((link, index) => (
                        <a 
                          key={index} 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-[#421983]"
                        >
                          {link.platform === 'GitHub' && (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          )}
                          {link.platform === 'LinkedIn' && (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                          )}
                          {link.platform === 'Twitter' && (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                            </svg>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-xl text-gray-600">No artists found matching your criteria</p>
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

export default AllArtists;