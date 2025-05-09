import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import endpoints from '../../../constraints/apiConfig';

const ArtworkForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: [],
    startingBid: 1.0,
    minimumIncrement: 1.0,
    price: 1.0,
    biddingDuration: 3,
    images: [],
  });

  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isFixedPrice, setIsFixedPrice] = useState(false); // New state for checkbox

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    const numValue = Math.max(1, Number(value) || 1);
    setFormData({
      ...formData,
      [name]: numValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!isFixedPrice && (formData.biddingDuration < 1 || formData.biddingDuration > 30)) {
      setError('Bidding duration must be between 1 and 30 days');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('category', formData.category);
      data.append('tags', formData.tags.join(', '));
      if (isFixedPrice) {
        data.append('price', formData.price);
      } else {
        data.append('startingBid', formData.startingBid);
        data.append('minIncrement', formData.minimumIncrement);
        data.append('biddingDuration', formData.biddingDuration);
      }

      formData.images.forEach((file) => {
        data.append('images', file);
      });

      const response = await axios.post(endpoints.postArtWork, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setSuccess('Artwork created successfully!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setError(response.data.message || 'Failed to create artwork. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const files = [...e.target.files];
    setFormData({ ...formData, images: files });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = [...e.dataTransfer.files];
    setFormData({ ...formData, images: files });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mb-8 relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute left-6 top-6 flex items-center text-[#421983] hover:text-[#5a2da0]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back
      </button>

      <h2 className="text-2xl font-bold mb-6 text-[#421983] text-center">Submit Your Artwork</h2>
      {error && <div className="p-3 mb-4 text-red-600 bg-red-100 rounded-md">{error}</div>}
      {success && <div className="p-3 mb-4 text-green-600 bg-green-100 rounded-md">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Artwork Title*</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter artwork title"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description*</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Describe your artwork"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Category*</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="">Select category</option>
              <option value="Abstract">Abstract</option>
              <option value="Nature">Nature</option>
              <option value="Portrait">Portrait</option>
              <option value="Landscape">Landscape</option>
              <option value="Digital">Digital</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Tags</label>
            <input
              type="text"
              name="tags"
              value={formData.tags.join(', ')}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(tag => tag.trim()) })}
              placeholder="Abstract, Nature, Portrait"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>

        {/* Toggle for fixed price */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isFixedPrice}
            onChange={(e) => setIsFixedPrice(e.target.checked)}
            id="fixedPriceOnly"
          />
          <label htmlFor="fixedPriceOnly" className="text-sm font-medium text-gray-700">
            Enable Fixed Price Only
          </label>
        </div>

        {!isFixedPrice && (
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700">Starting Bid ($)*</label>
              <input
                type="number"
                name="startingBid"
                min="1"
                step="1"
                value={formData.startingBid}
                onChange={handleNumberChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <p className="mt-1 text-xs text-gray-500">Minimum $1</p>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700">Minimum Increment ($)*</label>
              <input
                type="number"
                name="minimumIncrement"
                min="1"
                step="1"
                value={formData.minimumIncrement}
                onChange={handleNumberChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <p className="mt-1 text-xs text-gray-500">Minimum $1 increment</p>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700">Bidding Duration (days)*</label>
              <input
                type="number"
                name="biddingDuration"
                min="1"
                max="30"
                value={formData.biddingDuration}
                onChange={(e) => {
                  const value = Math.max(1, Math.min(30, Number(e.target.value)) || 1);
                  setFormData({ ...formData, biddingDuration: value });
                }}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <p className="mt-1 text-xs text-gray-500">1-30 days</p>
            </div>
          </div>
        )}

        {isFixedPrice && (
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700">Fixed Price ($)*</label>
            <input
              type="number"
              name="price"
              min="1"
              step="1"
              value={formData.price}
              onChange={handleNumberChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <p className="mt-1 text-xs text-gray-500">Minimum $1</p>
          </div>
        )}

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Images*</label>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`mt-1 flex flex-col items-center justify-center border-2 border-dashed rounded-md p-6 ${
              isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
            }`}
          >
            <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-sm text-gray-600 mb-2">
              {formData.images.length > 0 ? `${formData.images.length} file(s) selected` : 'Drag and drop images here'}
            </p>
            <label className="px-4 py-2 bg-[#421983] text-white rounded-md hover:bg-[#5a2da0] cursor-pointer">
              Browse Files
              <input
                type="file"
                name="images"
                onChange={handleFileChange}
                multiple
                accept="image/*"
                className="sr-only"
                required={formData.images.length === 0}
              />
            </label>
            <p className="mt-2 text-xs text-gray-500">JPEG, PNG (Max 5MB each)</p>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => {
              setFormData({
                title: '',
                description: '',
                category: '',
                tags: [],
                startingBid: 1.0,
                minimumIncrement: 1.0,
                price: 1.0,
                biddingDuration: 3,
                images: [],
              });
              setIsFixedPrice(false);
              setError('');
              setSuccess('');
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-[#f35e21] text-white rounded-md hover:bg-[#e0551b] disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : 'Submit Artwork'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArtworkForm;
