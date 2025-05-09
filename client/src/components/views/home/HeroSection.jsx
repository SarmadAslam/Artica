import React from "react";
import { Link, useNavigate } from "react-router-dom";
import homebg from "../../../assets/homebg.png";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/Dashboard');
    } else {
      navigate('/signin');
    }
  };

 

  return (
    <div
      className="relative flex items-center justify-start min-h-screen px-4 py-12 text-left"
      style={{
        backgroundImage: `url(${homebg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 shadow-lg"></div>
      
      <div className="relative z-10 max-w-3xl space-y-8 ml-8 md:ml-16 lg:ml-24">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          Unleash Your Creativity.
          <br />
          Share Your Story. Inspire
          <br />
          the World.
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-12">
          <button
            onClick={handleRedirect}
            className="px-8 py-3 bg-[#f35e21] hover:bg-[#e0551a] text-white font-medium rounded-lg transition duration-200"
          >
            Create Portfolio
          </button>
          <Link to="/Dashboard/listmyartwork">
          
          <button
            className="px-8 py-3 border-2 border-white hover:border-[#f35e21] text-white hover:text-[#f35e21] font-medium rounded-lg transition duration-200"
          >
            List Artwork
          </button>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
