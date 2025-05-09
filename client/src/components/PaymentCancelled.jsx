import React from 'react';
import { HiOutlineXCircle } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

const PaymentCancelled = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-6">
      <HiOutlineXCircle className="h-24 w-24 text-red-500" />
      <h1 className="text-3xl font-bold mt-4 text-red-700">Payment Cancelled</h1>
      <p className="mt-2 text-center text-gray-700 max-w-md">
        It looks like your payment was cancelled. You can try again or return to the homepage.
      </p>
      <Link to="/" className="mt-6 px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition">
        Go to Home
      </Link>
    </div>
  );
};

export default PaymentCancelled;
