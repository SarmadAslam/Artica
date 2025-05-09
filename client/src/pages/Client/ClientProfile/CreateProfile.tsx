
import React from "react";
import { useState } from "react";
import { useCreateClientProfileMutation } from "../../../redux/features/ClientProfile/clientProfileApi";
import { useNavigate } from "react-router-dom";

export default function CreateProfile() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
  });
  const [createClientProfile, { isLoading, isError, isSuccess, error }] = useCreateClientProfileMutation();
  {isLoading && <p>Loading...</p>}
  {isError && <p className="text-red-500">Error creating profile.</p>}
  {isSuccess && <p className="text-green-500">Profile created!</p>}


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     await createClientProfile(formData).unwrap();
  //     alert("Profile created successfully!");
  //   } catch (err) {
  //     console.error("Error creating profile:", err);
  //     alert("Failed to create profile.");
  //   }
  // };
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userToken = localStorage.getItem("token"); // Assuming the token is stored in localStorage

    if (!userToken) {
      alert("Please log in first.");
      navigate("/login"); 
      return;
    }

    // Extract the userId from the token (you can decode the JWT token if needed)
    const userId = JSON.parse(atob(userToken.split('.')[1])).userId; // Extract userId from the token

    try {
      // const profileData = { ...formData, userId }; // Attach the userId to the profile data
      const profileData = { ...formData }
      await createClientProfile(profileData).unwrap();
      // alert("Profile created successfully!");
      navigate("/clienthomepage");

    } catch (err) {
      console.error("Error creating profile:", err);
      alert("Failed to create profile.");
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-lg">
        <h2 className="text-xl font-semibold text-purple-800 mb-6">Create Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-dashed border-purple-300 flex items-center justify-center">
                <span className="text-gray-400">👤</span>
              </div>
              <label className="absolute bottom-0 right-0 bg-purple-600 p-1 rounded-full cursor-pointer">
                <input type="file" className="hidden" />
                <span className="text-white text-sm">📷</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#F35E21]">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#F35E21]">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#F35E21]">Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#F35E21]">
                Date of Birth *
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#F35E21]">Phone Number *</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#F35E21]">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 text-sm"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
