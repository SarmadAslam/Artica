import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import imagePath from "../constraints/imagepath";
import Loader from "./loader/Loader";
import { motion } from "framer-motion";
import endpoints from "@/constraints/apiConfig";

const ArtistProfile = () => {
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(`${endpoints.getUserById}/${id}`);
        const data = await response.json();

        if (data.success) {
          setArtist(data.user);
        } else {
          console.error("Failed to fetch artist");
        }
      } catch (error) {
        console.error("Error fetching artist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-[#421983] mb-4">Artist Not Found</h2>
          <p className="text-gray-600">The artist you're looking for doesn't exist or may have been removed.</p>
        </div>
      </div>
    );
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-[#f9f5ff] to-[#e6d6ff] py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header Section */}
          <div className="relative h-48 bg-gradient-to-r from-[#5e35b1] to-[#421983] flex items-center justify-center">
            <div className="absolute -bottom-16 left-8">
              <div className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-xl">
                {artist.profilePic ? (
                  <img
                    src={`${imagePath}${artist.profilePic}`}
                    alt={artist.username}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="pt-20 pb-8 px-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Column */}
              <div className="md:w-1/3">
                <motion.div variants={itemVariants}>
                  <h1 className="text-3xl font-bold text-[#421983]">{artist.username}</h1>
                  <div className="flex items-center mt-2">
                    <span className="bg-[#ede7f6] text-[#5e35b1] px-3 py-1 rounded-full text-sm font-medium">
                      {artist.role}
                    </span>
                  </div>
                </motion.div>

                {/* Stats */}
                {artist.stats && (
                  <motion.div variants={itemVariants} className="mt-8 space-y-4">
                    <div className="flex items-center">
                      <div className="bg-[#f3e5f5] p-3 rounded-full mr-4">
                        <svg className="w-6 h-6 text-[#8e24aa]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Followers</p>
                        <p className="font-bold text-lg">{artist.stats.followers || 0}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-[#e8f5e9] p-3 rounded-full mr-4">
                        <svg className="w-6 h-6 text-[#43a047]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Projects</p>
                        <p className="font-bold text-lg">{artist.stats.projects || 0}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Social Links */}
                {artist.socialLinks && artist.socialLinks.length > 0 && (
                  <motion.div variants={itemVariants} className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Connect</h3>
                    <div className="flex space-x-4">
                      {artist.socialLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gray-100 hover:bg-[#f3e5f5] p-3 rounded-full transition-colors duration-300"
                          aria-label={link.platform}
                        >
                          {link.platform === "GitHub" && (
                            <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          )}
                          {link.platform === "LinkedIn" && (
                            <svg className="w-6 h-6 text-[#0077b5]" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                          )}
                          {link.platform === "Twitter" && (
                            <svg className="w-6 h-6 text-[#1da1f2]" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            </svg>
                          )}
                          {link.platform === "Instagram" && (
                            <svg className="w-6 h-6 text-[#e1306c]" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                          )}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Right Column */}
              <div className="md:w-2/3">
                {/* About Section */}
                {artist.about && (
                  <motion.div variants={itemVariants} className="mb-8">
                    <h2 className="text-2xl font-bold text-[#421983] mb-4">About</h2>
                    <p className="text-gray-700 leading-relaxed">{artist.about}</p>
                  </motion.div>
                )}

                {/* Skills Section */}
                {artist.skills && artist.skills.length > 0 && (
                  <motion.div variants={itemVariants} className="mb-8">
                    <h2 className="text-2xl font-bold text-[#421983] mb-4">Skills & Expertise</h2>
                    <div className="flex flex-wrap gap-3">
                      {artist.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-gradient-to-r from-[#f3e5f5] to-[#e8eaf6] text-[#5e35b1] px-4 py-2 rounded-full text-sm font-medium shadow-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Experience/Projects Section */}
                {artist.experience && (
                  <motion.div variants={itemVariants} className="mb-8">
                    <h2 className="text-2xl font-bold text-[#421983] mb-4">Experience</h2>
                    <div className="space-y-4">
                      {artist.experience.map((exp, index) => (
                        <div key={index} className="border-l-4 border-[#b39ddb] pl-4 py-2">
                          <h3 className="font-bold text-lg text-gray-800">{exp.role}</h3>
                          <p className="text-gray-600">{exp.company} • {exp.duration}</p>
                          <p className="text-gray-700 mt-1">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Call to Action */}
            <motion.div 
              variants={itemVariants}
              className="mt-12 text-center"
            >
              <button className="bg-gradient-to-r from-[#7e57c2] to-[#5e35b1] text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:from-[#5e35b1] hover:to-[#7e57c2]">
                Contact Artist
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ArtistProfile;