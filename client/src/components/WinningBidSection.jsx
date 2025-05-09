import React from 'react';

const WinningBidSection = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-[#421983] mb-4">
        Winning Bid Confirmed!
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Congratulations! Your artwork has received a winning bid.
      </p>

      {/* Divider */}
      <div className="border-b border-gray-300 mb-6"></div>

      {/* Artwork Details */}
      <h2 className="text-2xl font-semibold text-[#421983] mb-4">
        Abstract Harmony #247
      </h2>
      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Winning Bid Amount:</span>
          <span className="font-semibold">$2,500.00</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Bid Status:</span>
          <span className="font-semibold text-green-600">Winner Selected</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-b border-gray-300 mb-6"></div>

      {/* Winner Information */}
      <h3 className="text-xl font-semibold text-[#421983] mb-4">
        Winner Information
      </h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-lg font-semibold text-gray-600">MA</span>
            </div>
          </div>
          <div>
            <p className="font-semibold">Michael Anderson</p>
            <p className="text-sm text-gray-600">Art Collector</p>
            <div className="flex items-center">
              <span className="text-yellow-400">★★★★☆</span>
              <span className="text-sm text-gray-600 ml-2">(4-5)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex space-x-4">
        <button className="px-6 py-2 bg-[#421983] text-white rounded-md hover:bg-[#32156b] transition duration-300">
          Contact Buyer
        </button>
        <button className="px-6 py-2 bg-[#f35e21] text-white rounded-md hover:bg-[#d14e1b] transition duration-300">
          Mark as Sold
        </button>
      </div>
    </div>
  );
};

export default WinningBidSection;