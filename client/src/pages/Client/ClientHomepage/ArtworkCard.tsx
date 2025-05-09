'use client';
import React from 'react';

interface ArtworkCardProps {
  title: string;
  artist: string;
  price: string;
  imageUrl: string;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ title, artist, price, imageUrl }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <img src={imageUrl} alt={title} className="h-48 w-full object-cover" />
      <div className="p-4 space-y-2">
        <h4 className="text-lg font-bold">{title}</h4>
        <p className="text-gray-600 text-sm">By {artist}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-[#F35E21] font-semibold">{price}</span>
          <button className="bg-indigo-900 text-white text-sm px-4 py-2 rounded hover:bg-indigo-700">
            Place Bid
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;
