import React from 'react';
import { Link } from 'react-router-dom';
const Banner = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      {/* Introductory Lines */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
        {/* Text Section */}
        <div className="sm:w-1/2">
          <h1 className="text-xl sm:text-3xl text-black mb-8">
            Explore Thousands of Art Freelance Jobs
          </h1>
          <h2 className="text-4xl sm:text-5xl font-bold mb-8">
  <span className="text-[#421983]">Unlock</span> <span className="text-[#F35E21]">Your Artistic Career with</span> <span className="text-[#FFD700]">Rungley</span>
</h2>


          <p className="text-lg sm:text-xl font-extralight text-[#421983] mb-8">
            Connect with clients globally, showcase your traditional art, and discover the perfect freelance opportunities. Artica helps you take your creativity to the next level.
          </p>
        </div>

        {/* Image Section */}
        <div className="sm:w-1/2 mt-8 sm:mt-0 flex justify-center">
          <img
            src="/src/assets/flower.jpeg"
            alt="Rungley Logo"
            className="w-full sm:w-1/2 h-auto object-contain"
          />
        </div>
       
      </div>
      <Link to="/title">
          <button className="bg-[#FFD700] text-black px-6 py-3 rounded-lg font-semibold mt-4">
            Post a Job
          </button>
        </Link>
    </div>
  );
};

export default Banner;
