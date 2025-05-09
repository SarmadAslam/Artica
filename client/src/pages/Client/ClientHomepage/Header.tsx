'use client';
import React from 'react';
import { UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // <-- Import navigate

const Header = () => {
  const navigate = useNavigate(); // <-- Initialize navigate

  return (
    <header className="flex items-center justify-between px-10 py-6 bg-white shadow-sm">
      <div className="text-2xl font-bold text-indigo-900">Rungley</div>
      <nav className="flex space-x-8 text-gray-700 font-medium">
        <button 
          onClick={() => navigate('/client-dashboard')}
          className="hover:text-indigo-700 focus:outline-none"
        >
          Dashboard
        </button>
        <button
      onClick={() => navigate('/AllArts')}
      className="hover:text-indigo-700 focus:outline-none"
    >
      Artworks
    </button>
        <button 
          onClick={() => navigate('/client-view-exhibition')}
          className="hover:text-indigo-700 focus:outline-none"
        >
          Exhibitions
        </button>
      </nav>
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <UserCircle className="w-10 h-10 text-gray-500" />
      </div>
    </header>
  );
};

export default Header;
