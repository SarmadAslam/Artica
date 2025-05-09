// components/ClientProfileCard.tsx
import React, { useEffect } from "react";
import { useGetClientProfileQuery } from "../../../redux/features/ClientProfile/clientProfileApi";

const ClientProfileCard = () => {
  const token = localStorage.getItem("token");
  const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null;

  const { data: profile, error, isLoading } = useGetClientProfileQuery(userId);

  if (isLoading) return <p>Loading profile...</p>;
  if (error) return <p className="text-red-500">Failed to load profile.</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">Your Profile</h2>
        <div className="space-y-3">
          <p><strong>First Name:</strong> {profile.firstName}</p>
          <p><strong>Last Name:</strong> {profile.lastName}</p>
          <p><strong>Gender:</strong> {profile.gender}</p>
          <p><strong>Date of Birth:</strong> {profile.dob}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Email:</strong> {profile.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ClientProfileCard;
