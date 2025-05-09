import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import profile from '../../../assets/profile/avatar.png'; // Default profile picture
import { FaInstagram, FaTwitter, FaLinkedin, FaTimes } from "react-icons/fa";
import InputField from '../../globalComponents/InputField';
import Button from '../../globalComponents/Button';
import AddSkillPopup from './AddSkillPopup';
import axios from 'axios';
import endpoints from '../../../constraints/apiConfig';

const EditArtistPortfolio = () => {
  const location = useLocation();
  const userData = location.state?.user; // Access the passed user data

  // Initialize state with user data
  const [selectedImage, setSelectedImage] = useState(null); // Store the File object
  const [imagePreview, setImagePreview] = useState(userData?.profilePic); // Store the preview URL
  const [username, setUsername] = useState(userData?.username || '');
  const [email, setEmail] = useState(userData?.email || '');
  const [about, setAbout] = useState(userData?.about || '');
  const [skills, setSkills] = useState(userData?.skills || []);
  const [software, setSoftware] = useState(userData?.software || []);
  const [role, setRole] = useState(userData?.role || '');
  const [instagram, setInstagram] = useState(userData?.instagram || '');
  const [twitter, setTwitter] = useState(userData?.twitter || '');
  const [linkedin, setLinkedin] = useState(userData?.linkedin || '');
  const [website, setWebsite] = useState(userData?.website || '');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Handle image file selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file); // Store the File object
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  // Add a new skill
  const addSkill = (newSkill) => {
    if (!skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
    }
  };

  // Remove a skill
  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  // Handle form submission
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('about', about);
    formData.append('skills', skills.join(','));
    formData.append('software', software.join(','));
    formData.append('role', role);
    formData.append('instagram', instagram);
    formData.append('twitter', twitter);
    formData.append('linkedin', linkedin);
    formData.append('website', website);

    // Append the profile picture if a new file is selected
    if (selectedImage) {
      formData.append('profilePic', selectedImage);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${endpoints.editProfile}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="bg-[#E5E7EB]">
      <div className="w-[90%] md:w-[70%] mx-auto space-y-6">
        {/* Header Section */}
        <div className="py-3 space-y-2">
          <h1 className="text-3xl font-bold text-[#421983]">Edit Artist Portfolio</h1>
          <p className="text-[#4B5563]">Update your portfolio information and showcase your work</p>
        </div>

        {/* Basic Information Section */}
        <div className="bg-white p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-[#421983]">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 justify-between mt-4">
            <div className="space-y-3">
              <span className="text-[#374151]">Profile Picture</span>
              <div className="flex items-center gap-5 py-2">
                <div className="size-20 rounded-full overflow-hidden">
                  <img 
                    src={imagePreview || profile} // Use the preview URL or a default image
                    alt="Profile" 
                    className='size-full object-cover rounded-full' 
                  />
                </div>
                <label className='px-4 py-2 border border-[#D1D5DB] rounded-lg cursor-pointer'>
                  Upload Photo
                  <input type="file" className="hidden" onChange={handleImageChange} />
                </label>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-black">
            <InputField label="Full Name" value={username} onChange={(e) => setUsername(e.target.value)} />
            <InputField label="Professional Title" value={role} onChange={(e) => setRole(e.target.value)} />
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="bg-white p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-[#421983]">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <InputField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <InputField label="Instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
            <InputField label="Twitter" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
            <InputField label="LinkedIn" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
            <InputField label="Website" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
        </div>

        {/* Artist Biography Section */}
        <div className="bg-white p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-[#421983]">Artist Biography</h3>
          <div className="grid grid-cols-1 mt-3">
            <InputField label="" value={about} onChange={(e) => setAbout(e.target.value)} />
          </div>
        </div>

        {/* Skills & Expertise Section */}
        <div className="bg-white p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-[#421983]">Skills & Expertise</h3>
          <ul className="mt-2 flex flex-wrap items-center gap-2">
            {skills.map((skill, index) => (
              <li key={index} className="flex items-center gap-2 bg-[#E5E7EB] px-3.5 py-1 rounded-full text-xs">
                {skill}
                <button onClick={() => removeSkill(skill)} className="text-red-500">
                  <FaTimes size={12} />
                </button>
              </li>
            ))}
            <li>
              <button 
                onClick={() => setIsPopupOpen(true)} 
                className="text-xs text-[#F35E21] border border-[#F35E21] px-3.5 py-1 rounded-full"
              >
                + Add Skill
              </button>
            </li>
          </ul>
        </div>

        {/* Save/Cancel Buttons */}
        <div className="py-3 flex items-center justify-end gap-3">
          <Button text="Cancel" variant="outline" className="border" />
          <Button text="Save Changes" variant="primary" onClick={handleSubmit} />
        </div>

        {/* Add Skill Popup */}
        <AddSkillPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} onAddSkill={addSkill} />
      </div>
    </div>
  );
};

export default EditArtistPortfolio;