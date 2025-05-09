import React from 'react';
import Footer from './globalComponents/Footer';
import Navbar from './globalComponents/Navbar';

const AboutUs = () => {
  return (
    <>

   <Navbar/>
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-700 h-screen">
      <h1 className="text-4xl font-bold text-[#421983] mb-6">About Rungley</h1>
      <p className="text-lg mb-4">
        Rungley is a vibrant digital platform that empowers artists to showcase their creativity to a global audience.
        Artists can upload and sell their digital artworks, write and explore inspiring art-related articles, and connect
        with art lovers and collectors through a dynamic marketplace.
      </p>
      <p className="text-lg mb-4">
        Whether you're here to bid on one-of-a-kind pieces, browse beautiful art collections, read stories, or share your own work —
        Rungley is your space to experience, create, and celebrate digital art.
      </p>
      <p className="text-lg">
        Join the Rungley community today and start your artistic journey.
      </p>
    </div>
    <Footer/>
    </>
  );
};

export default AboutUs;
