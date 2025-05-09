import React, { useEffect, useState } from 'react';
import { HiOutlineCheckCircle } from 'react-icons/hi2';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import endpoints from '@/constraints/apiConfig';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('confirming');
  const purchaseId = searchParams.get('purchaseId');

  useEffect(() => {
    const confirmPurchase = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored
        const res = await axios.post(
          endpoints.stripeconfirm,
          { purchaseId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setStatus('confirmed');
      } catch (error) {
        console.error('Error confirming purchase:', error);
        setStatus('error');
      }
    };

    if (purchaseId) {
      confirmPurchase();
    }
  }, [purchaseId]);

  if (status === 'confirming') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
        <h1 className="text-xl text-gray-600">Confirming your purchase...</h1>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-6">
        <h1 className="text-3xl font-bold text-red-600">Something went wrong!</h1>
        <p className="mt-2 text-gray-700">We couldn't confirm your purchase. Please contact support.</p>
        <Link to="/" className="mt-6 px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
      <HiOutlineCheckCircle className="h-24 w-24 text-green-500" />
      <h1 className="text-3xl font-bold mt-4 text-green-700">Payment Successful!</h1>
      <p className="mt-2 text-center text-gray-700 max-w-md">
        Thank you for your purchase. Your artwork will be delivered or made available shortly.
      </p>
      <Link to="/" className="mt-6 px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition">
        Go to Home
      </Link>
    </div>
  );
};

export default PaymentSuccess;
