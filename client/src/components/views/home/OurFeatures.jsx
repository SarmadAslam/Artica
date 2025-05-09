import React from 'react';
import { FaPalette, FaGavel, FaPenAlt, FaShoppingCart } from "react-icons/fa";

const OurFeatures = () => {

  const features = [
    {
      id: 1,
      title: "Create Portfolio",
      description: "Showcase your artwork with a professional portfolio",
      icon: <FaPalette className="text-3xl text-[#421983]" />,
    },
    {
      id: 2,
      title: "Bid on Art",
      description: "Participate in exciting art auctions",
      icon: <FaGavel className="text-3xl text-[#421983]" />,
    },
    {
      id: 3,
      title: "Write Articles",
      description: "Share your thoughts and insights about art",
      icon: <FaPenAlt className="text-3xl text-[#421983]" />,
    },
    {
      id: 4,
      title: "Purchase Art",
      description: "Own the artwork you love",
      icon: <FaShoppingCart className="text-3xl text-[#421983]" />,
    },
  ];
  
  return (
    <>
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Explore Our Features</h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Discover all the ways you can engage with the art community
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 p-4 bg-white rounded-full shadow-md">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                {/* <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center">
                  Learn More
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
    
  );
};

export default OurFeatures;