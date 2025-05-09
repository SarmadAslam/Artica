import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Title = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For programmatic navigation

  const handleNext = () => {
    if (!jobTitle.trim()) {
      setError("Please enter a job title before proceeding.");
      return;
    }
    setError("");
    navigate("/job-form", { state: { jobTitle } }); // Pass jobTitle to the next page
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-6 mt-4 px-12 md:px-20">
      
      {/* Intro Section */}
      <div className="md:w-1/2 space-y-4">
        <h1 className="text-[#421983] text-3xl font-bold">Give Your Job a Title</h1>
        <p className="text-[#F35E21] font-semibold">Example Titles:</p>
        <p className="font-extralight">
          - "Realistic Portrait Artist Needed for Custom Oil Painting" <br />
          - "Watercolor Artist Required for Book Illustrations" <br />
          - "Freelance Calligraphy Artist for Wedding Invitations" <br />
          - "Seeking Art Instructor for Online Acrylic Painting Classes" <br />
          - "Looking for a Sketching Tutor for Beginners"
        </p>
      </div>

      {/* Input Section */}
      <div className="md:w-1/2 flex flex-col items-start space-y-4 mt-6 md:mt-0">
        <p className="text-[#421983] font-medium">Write a title for your project:</p>
        
        {/* Job Title Input */}
        <input 
          type="text" 
          placeholder="Enter job title..." 
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F35E21]"
        />

        {/* Error Message */}
        {error && <p className="text-red-500 mt-2">{error}</p>}

        {/* Next Button (Programmatic Navigation) */}
        <button
          onClick={handleNext}
          className="mt-6 w-full bg-[#F35E21] text-white font-medium px-6 py-3 rounded-lg hover:bg-opacity-80 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Title;
