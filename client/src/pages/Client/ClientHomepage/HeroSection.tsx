'use client';
import { useNavigate } from 'react-router-dom'; // Your requirement

const HeroSection = () => {
    const navigate = useNavigate();
    const handlePostJob = () => {
        navigate('/postjob');
      };
  return (
    <section className="bg-indigo-900 text-white px-10 py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">Connect with Top Artists Worldwide</h1>
      <p className="text-lg mb-8 max-w-2xl mx-auto">
        Commission unique artworks, collaborate with talented artists, and explore exclusive exhibitions.
      </p>
      <div className="flex justify-center space-x-6">
        <button onClick={handlePostJob} className="bg-[#F35E21] text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600">
          Post a Job
        </button>
        <button
      onClick={() => navigate('/Dashboard/bidding')}
      className="bg-white text-indigo-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
    >
      Place Bid
    </button>
      </div>
    </section>
  );
};
 
export default HeroSection;
