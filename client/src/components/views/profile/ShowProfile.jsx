import React, { useState, useEffect } from "react";
import { FaInstagram, FaBehance, FaDribbble, FaEnvelope, FaPlus } from "react-icons/fa";
import Button from "../../globalComponents/Button";
import PortfolioCard from "../../globalComponents/PortfolioCard";
import ProfileCard from "../../globalComponents/ProfileCard";
import axios from "axios";
import endpoints from "../../../constraints/apiConfig";
import Loader from "../../loader/Loader";

const ShowProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal visibility state
  const [newArtwork, setNewArtwork] = useState({
    title: '',
    description: '',
    year: '',
    tags: '',
    image: null,
    type: ""
  });  // State for new artwork
  const [isUploading, setIsUploading] = useState(false); // Loading state for the upload process

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const profileResponse = await axios.get(endpoints.getprofile, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfileData(profileResponse.data.user);
        setPortfolio(profileResponse.data.user.arts);  
        setLoading(false);
      } catch (err) {
        console.log(err)
        setError("Error loading data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);  // Toggle modal visibility
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArtwork({ ...newArtwork, [name]: value });
  };

  const handleImageChange = (e) => {
    setNewArtwork({ ...newArtwork, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true); // Start the loading state for the upload process
    const formData = new FormData();
    formData.append("title", newArtwork.title);
    formData.append("description", newArtwork.description);
    formData.append("year", newArtwork.year);
    formData.append("tags", newArtwork.tags);
    formData.append("image", newArtwork.image);
    formData.append("type", newArtwork.type);

    try {
      await axios.post("http://localhost:3000/api/v1/art/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setIsUploading(false); 
      setIsModalOpen(false);
      // You can add a success notification or re-fetch portfolio after upload
    } catch (err) {
      console.log(err)
      setIsUploading(false); // Stop the loading state if there's an error
      setError("Error uploading artwork. Please try again later.");
    }
  };

  // If loading or error
  if (loading) {
    return <div><Loader/></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // const updateAboutme = (

  //   axios.post("http://localhost:3000/api/v1/auth/updateAbout")
  // )

  return (
    <div className="w-[90%] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
        {profileData && (
          <ProfileCard
            img={profileData.profilePic || "/path/to/default/profilePic.png"}
            name={profileData.username || "Sarah Anderson"}
            job={profileData.role || "Digital Artist & Illustrator"}
            socials={profileData.socialLinks?.map((social) => ({
              icon: getSocialIcon(social.platform),
              link: social.url,
            }))}
            button={{ text: "Contact Me", variant: "primary", icon: FaEnvelope }}
          />
        )}
        <div className="col-span-2">
          <div className="p-6 rounded-xl shadow-xl space-y-4">
            <strong className="text-xl block">About Me</strong>
            <div className="text-[#4B5563]">
              <p>{profileData?.about}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong>Skills</strong>
                <ul className="mt-2 flex items-center flex-wrap gap-2">
                  {profileData?.skills?.map((skill, index) => (
                    <li key={index}>
                      <span className="text-xs bg-[#E5E7EB] px-3.5 py-1 rounded-full">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>Software</strong>
                <ul className="mt-2 flex items-center gap-2">
                  {profileData?.software?.map((software, index) => (
                    <li key={index}>
                      <span className="text-xs bg-[#E5E7EB] px-3.5 py-1 rounded-full">{software}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-8 py-4">
        <div className="flex items-center justify-between">
          <strong className="text-2xl">Portfolio</strong>
          <Button
            text="Upload Artwork"
            variant="primary"
            icon={FaPlus}
            className="w-full max-w-52"
            onClick={handleModalToggle}  // Toggle modal on button click
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 py-4 gap-6">
          {portfolio?.map((project, index) => (
            <PortfolioCard
              key={index}
              img={`http://localhost:3000/${project.image}` }
              title={project.title}
              description={project.description}
              year={project.year}
            />
          ))}
        </div>
      </div>

      {/* Modal for Upload Artwork */}
      {isModalOpen && (
        <div className="fixed w-full inset-0 p-20 bg-slate-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-2xl mb-4">Upload Artwork</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                value={newArtwork.title}
                onChange={handleInputChange}
                placeholder="Title"
                className="w-full p-2 mb-4 border"
              />
              <textarea
                name="description"
                value={newArtwork.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="w-full p-2 mb-4 border"
              />
              <input
                type="number"
                name="year"
                value={newArtwork.year}
                onChange={handleInputChange}
                placeholder="Year"
                className="w-full p-2 mb-4 border"
              />
              <input
                type="text"
                name="tags"
                value={newArtwork.tags}
                onChange={handleInputChange}
                placeholder="Tags"
                className="w-full p-2 mb-4 border"
              />
              <input
                type="text"
                name="type"
                value={newArtwork.type}
                onChange={handleInputChange}
                placeholder="Type"
                className="w-full p-2 mb-4 border"
              />
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="w-full p-2 mb-4 border"
              />
              <div className="flex justify-between">
                <button 
                  type="submit" 
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  disabled={isUploading} 
                >
                  {isUploading ? "Uploading..." : "Upload"}  {/* Show "Uploading..." when uploading */}
                </button>
                <button
                  type="button"
                  onClick={handleModalToggle}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const getSocialIcon = (platform) => {
  switch (platform) {
    case "LinkedIn":
      return FaBehance;  
    case "GitHub":
      return FaInstagram;
    case "Twitter":
      return FaDribbble;
    default:
      return FaEnvelope;
  }
};

export default ShowProfile;
