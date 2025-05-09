

import React from 'react';
import DashboardCard from './DashboardCard';
import { FaPalette } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#5A24B5] text-white px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Rungley</h1>
        <div className="flex items-center gap-3">
          <span className="opacity-90">
            <FaPalette size={18} />
          </span>
          <span className="text-sm font-medium">Rabail Salman</span>
          <img
            src="https://ui-avatars.com/api/?name=John+Anderson"
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </header>

      <main className="px-10 py-8 mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Welcome back, Rabail! <span role="img">👋</span></h2>
        <p className="text-sm text-gray-500 mb-8">Your creative journey continues here</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div onClick={() => navigate('/BidHistory')} className="cursor-pointer">
        <DashboardCard
          title="My Bids"
          description="Track your active and past bids on artworks"
          linkText="View All Bids →"
          badgeText="12 Active"
          background="#6B46C1"
        />
      </div>

      <div onClick={() => navigate('/search-job')} className="cursor-pointer">
            <DashboardCard
              title="My Job Posts"
              description="Manage your posted art projects"
              linkText="View Job Posts →"
              badgeText="3 Open"
              background="#F35E21"
            />
          </div>

          <DashboardCard
            title="Art Preferences"
            description="Customize your art recommendations"
            linkText="Update Preferences →"
            background="#FFD700" // Warm Gold
            icon={<FaPalette />}
          />

          <DashboardCard
            title="My Orders"
            description="Track your artwork purchases"
            linkText="View Orders →"
            badgeText="2 In Progress"
            background="#805AD5" // Slightly lighter Indigo
          />
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard;