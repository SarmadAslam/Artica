import React, { useState } from 'react';
import { FaUserAlt, FaEnvelope, FaLock, FaRegUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Button from '../../globalComponents/Button';
import Navbar from '../../globalComponents/Navbar';
import Footer from '../../globalComponents/Footer';
import endpoints from '../../../constraints/apiConfig'; // Import your endpoints

const Signup = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear previous errors
    setResponseMessage(''); // Clear previous response messages

    try {
      const response = await fetch(endpoints.signup, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Response:', data); // Log the response

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong.');
      }

      if (data.success) {
        localStorage.setItem('token', data.token); // Store token
        setResponseMessage(data.message); // Show success message

        // Redirect to Signin page after 3 seconds
        setTimeout(() => {
          navigate('/signin'); // Redirect to Signin page
        }, 3000);
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err); // Log the error
      setError(err.message || 'Server error. Please try again later.');
    } finally {
      setLoading(false);
    }

    setTimeout(() => {
      setResponseMessage(''); // Hide success message after 5 seconds
      setError('');
    }, 3000);
  };

  return (
    <>
      <Navbar />
      <div className="w-[87%] mx-auto mb-4 pt-4">
        <div className="max-w-lg mx-auto shadow-lg p-6 bg-white rounded-lg">
          <h2 className="text-2xl font-bold text-[#1F2937] text-center mb-6">Sign Up</h2>

          {error && <div className="text-red-600 text-center mb-4">{error}</div>}

          {responseMessage && (
            <div className="text-green-600 text-center mb-4">{responseMessage}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-[#4B5563]">
                Username
              </label>
              <div className="flex items-center border border-[#D1D5DB] rounded-md p-2 mt-2">
                <FaUserAlt className="text-gray-500" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-2 ml-2 border-none outline-none"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-[#4B5563]">
                Email Address
              </label>
              <div className="flex items-center border border-[#D1D5DB] rounded-md p-2 mt-2">
                <FaEnvelope className="text-gray-500" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 ml-2 border-none outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-[#4B5563]">
                Password
              </label>
              <div className="flex items-center border border-[#D1D5DB] rounded-md p-2 mt-2">
                <FaLock className="text-gray-500" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 ml-2 border-none outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="role" className="block text-sm font-medium text-[#4B5563]">
                Role
              </label>
              <div className="flex items-center border border-[#D1D5DB] rounded-md p-2 mt-2">
                <FaRegUser className="text-gray-500" />
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-2 ml-2 border-none outline-none"
                  placeholder="Enter your role (e.g., artist)"
                  required
                />
              </div>
            </div>

            <Button
              text={loading ? 'Signing Up...' : 'Sign Up'}
              variant="primary"
              className="w-full !rounded-full py-3"
              type="submit"
              disabled={loading}
            />
          </form>

          {/* Add a clickable heading to navigate to Signin */}
          <p className="text-center mt-4 text-[#4B5563]">
            Already have an account?{' '}
            <span
              onClick={() => navigate('/signin')} // Navigate to Signin page
              className="text-[#F35E21] cursor-pointer hover:underline"
            >
              Click here to Sign In
            </span>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;