import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaBehance, FaTwitter, FaPlus, FaLinkedin, FaGlobe, FaEllipsisV, FaPenNib } from "react-icons/fa";
import { SiGit, SiPostman, SiJavascript, SiNodedotjs, SiReact, SiMongodb } from "react-icons/si";
import Button from "../../globalComponents/Button";
import ArtworkCard from "../../globalComponents/ArtworkCard";
import axios from "axios";
import endpoints from "../../../constraints/apiConfig";
import Loader from "../../loader/Loader";
import imagePath from "../../../constraints/imagepath";

const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        setPortfolio(profileResponse.data.user.ShowArtWork);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Error loading data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddNewClick = () => {
    navigate("/Dashboard/artworkForm");
  };

  const handleArticlesClick = () => {
    navigate("/myArticles");
  };

  const handleArtworkClick = (artwork) => {
    navigate(`/artworkDetail`, { state: { artworkId: artwork._id } });
  };

  const handleEditProfileClick = () => {
    navigate(`/Dashboard/editArtistPortfolio`, { state: { user: profileData } });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDeleteArtwork = async (artworkId) => {
    if (!window.confirm("Are you sure you want to delete this artwork?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${endpoints.deleteArt}/${artworkId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPortfolio(portfolio.filter(artwork => artwork._id !== artworkId));
      alert("Artwork deleted successfully");
    } catch (err) {
      console.error("Error deleting artwork:", err);
      alert("Failed to delete artwork. Please try again.");
    }
  };

  if (loading) return <div><Loader /></div>;
  if (error) return <div>{error}</div>;
  if (!profileData) return <div>No profile data found.</div>;

  return (
    <div className="w-[87%] mx-auto mb-4 pt-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center px-4 py-8 rounded-lg shadow-lg space-y-3 bg-white">
          <div className="size-32 mx-auto relative">
            <img
              src={`${imagePath}${profileData.profilePic}` || "default-profile-image.svg"}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-purple-100"
            />
          </div>

          <div className="w-full">
            <strong className="text-2xl text-purple-800">{profileData.username}</strong> <br />
            <h4 className="text-[#4B5563] bg-purple-100 rounded-full px-3 py-1 mt-1 inline-block">
              {profileData.role}
            </h4>
          </div>

          {/* Social Links */}
          <div className="w-full py-2">
            <div className="flex justify-center gap-4 text-xl">
              {profileData.website && (
                <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800">
                  <FaGlobe />
                </a>
              )}
              {profileData.instagram && (
                <a href={profileData.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                  <FaInstagram />
                </a>
              )}
              {profileData.twitter && (
                <a href={profileData.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                  <FaTwitter />
                </a>
              )}
              {profileData.linkedin && (
                <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                  <FaLinkedin />
                </a>
              )}
            </div>
          </div>

          {/* About Section */}
          <div className="w-full text-start mt-2 bg-purple-50 p-4 rounded-lg">
            <span className="text-lg text-purple-800 font-medium">About</span>
            <p className="text-sm text-gray-600 mt-2">{profileData.about}</p>
          </div>

          {/* Skills Section */}
          {profileData.skills?.length > 0 && (
            <div className="w-full text-start bg-purple-50 p-4 rounded-lg">
              <span className="text-lg text-purple-800 font-medium">Skills</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {profileData.skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-1 bg-white px-2 py-1 rounded-full text-sm shadow-sm">
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Software Section */}
          {profileData.software?.length > 0 && (
            <div className="w-full text-start bg-purple-50 p-4 rounded-lg">
              <span className="text-lg text-purple-800 font-medium">Tools & Software</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {profileData.software.map((tool, index) => (
                  <div key={index} className="flex items-center gap-1 bg-white px-2 py-1 rounded-full text-sm shadow-sm">
                    <span>{tool}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="w-full space-y-2 mt-4">
            <Button
              text="Edit Profile"
              variant="outline"
              onClick={handleEditProfileClick}
              className="w-full !rounded-full border-purple-600 text-purple-600 hover:bg-purple-50"
            />
            <Button
              text="My Articles"
              icon={FaPenNib}
              onClick={handleArticlesClick}
              variant="secondary"
              className="w-full !rounded-full text-purple-700 border border-purple-300 "
            />
            <Button
              text="Logout"
              variant="danger"
              onClick={handleLogout}
              className="w-full !rounded-full"
            />
          </div>
        </div>

        {/* Artwork Section */}
        <div className="col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-purple-800">My Artworks</h2>
            <Button
              text="Add New Artwork"
              variant="primary"
              icon={FaPlus}
              className="text-sm"
              onClick={handleAddNewClick}
            />
          </div>

          {portfolio && portfolio.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolio.map((artwork, index) => (
                <div
                  key={index}
                  onClick={() => handleArtworkClick(artwork)}
                  className="cursor-pointer hover:transform hover:scale-105 transition-transform duration-200"
                >
                  <ArtworkCard
                    img={`${artwork.images[0]}`}
                    title={artwork.title}
                    description={artwork.description}
                    year={new Date(artwork.createdAt).getFullYear()}
                    bidAmount={artwork.currentBid || artwork.startingBid}
                    onDelete={(e) => {
                      e.stopPropagation();
                      handleDeleteArtwork(artwork._id);
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-purple-50 rounded-lg p-8 text-center">
              <p className="text-gray-600 mb-4">You haven't added any artworks yet.</p>
              <Button
                text="Add Your First Artwork"
                variant="primary"
                icon={FaPlus}
                onClick={handleAddNewClick}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
