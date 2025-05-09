import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Button from '../../globalComponents/Button';
import Navbar from '../../globalComponents/Navbar';
import Footer from '../../globalComponents/Footer';
import axios from 'axios'; // Import axios for making API requests
import endpoints from '../../../constraints/apiConfig'; // Import your API endpoints

const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    setLoading(true); // Set loading state to true when submitting the form
    setError(''); // Clear previous error messages
    setResponseMessage(''); // Clear previous success messages

    try {
      // Send login request with axios
      const response = await axios.post(endpoints.login, formData);

      if (response.data.success) {
        localStorage.setItem('token', response.data.token); // Store token
        setResponseMessage('Login successful! Redirecting...');

        // Redirect to homepage after 2 seconds
        setTimeout(() => {
          navigate('/Dashboard'); // Redirect to homepage
        }, 2000);
      } else {
        // Handle error response from API
        setError(response.data.message || 'Invalid email or password');
      }
    } catch (err) {
      console.log(err);
      setError('Invalid email or password');
    } finally {
      setLoading(false); // Set loading to false when the request finishes
    }

    // Hide the messages after 5 seconds
    setTimeout(() => {
      setError(''); // Hide error message
      setResponseMessage(''); // Hide success message
    }, 3000);
  };

  return (
    <>
      <Navbar />
      <div className="w-[87%] mx-auto mb-4 pt-4 h-screen mt-12">
        <div className="max-w-lg mx-auto shadow-lg p-6 bg-white rounded-lg">
          <h2 className="text-2xl font-bold text-[#1F2937] text-center mb-6">Login</h2>

          {/* Show error message if exists */}
          {error && <div className="text-red-600 text-center mb-4">{error}</div>}

          {/* Show success message if exists */}
          {responseMessage && (
            <div className="text-green-600 text-center mb-4">{responseMessage}</div>
          )}

          <form onSubmit={handleSubmit}>
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

            <div className="mb-6">
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

            <Button
              text={loading ? 'Logging in...' : 'Login'}
              variant="primary"
              className="w-full !rounded-full py-3"
              type="submit"
              disabled={loading} 
            />
          </form>

           <p className="text-center mt-4 text-[#4B5563]">
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/signup')}  
              className="text-[#F35E21] cursor-pointer hover:underline"
            >
              Click here to Sign Up
            </span>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;