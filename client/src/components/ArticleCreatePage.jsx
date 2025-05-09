import endpoints from "@/constraints/apiConfig";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const CreateArticle = () => {
  const history = useHistory();
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    tags: "",
    category: "",
    coverImage: null,
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [coverImage, setCoverImage] = useState(null);

  const handleTagAdd = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
    }
  };

  const handleCreateArticle = async () => {
    if (!newArticle.title || !newArticle.content) {
      setError("Title and content are required");
      return;
    }

    setIsLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("title", newArticle.title);
    formData.append("content", newArticle.content);
    formData.append("tags", tags.join(","));
    formData.append("category", newArticle.category);

    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(endpoints.postArticle, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to create article");
      }

      setSuccessMessage("Article created successfully!");
      setTimeout(() => {
        history.push("/my-articles");
      }, 2000);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create a New Article</h1>

      <div className="flex flex-col lg:flex-row gap-8 w-full">
        {/* Main Content */}
        <div className="lg:w-2/3 w-full space-y-6">
          {/* Title Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-base font-semibold text-gray-700 mb-3">Article Title</h2>
            <input
              type="text"
              className="w-full text-gray-900 font-medium outline-none border-b border-gray-300 pb-2"
              placeholder="Enter your article title"
              value={newArticle.title}
              onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
            />
          </div>

          {/* Content Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-base font-semibold text-gray-700 mb-3">Content</h2>
            <textarea
              value={newArticle.content}
              onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
              placeholder="Start writing your article here..."
              className="w-full min-h-[300px] border border-gray-300 rounded-md p-4"
            />
          </div>

          {/* Tags Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-base font-semibold text-gray-700 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-100 px-3 py-1 rounded-full"
                >
                  <span className="text-sm">{tag}</span>
                  <button
                    onClick={() => removeTag(index)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagAdd}
              placeholder="Add tags (press Enter to add)"
              className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3 w-full space-y-6">
          <div className="sticky top-6 space-y-6">
            {/* Cover Image */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-base font-semibold text-gray-700 mb-3">Cover Image</h3>
              <div
                onClick={() => document.getElementById("coverImageInput").click()}
                className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
              >
                {coverImage ? (
                  <img
                    src={URL.createObjectURL(coverImage)}
                    alt="Cover preview"
                    className="w-full h-48 object-cover mb-2 rounded-md"
                  />
                ) : (
                  <div className="space-y-2">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-gray-500">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                  </div>
                )}
              </div>
              <input
                id="coverImageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Category */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-base font-semibold text-gray-700 mb-3">Category</h3>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                value={newArticle.category}
                onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
              >
                <option value="">Select Category</option>
                <option value="technology">Technology</option>
                <option value="design">Design</option>
                <option value="business">Business</option>
                <option value="art">Art</option>
                <option value="culture">Culture</option>
              </select>
            </div>

            {/* Publish Button */}
            <button
              onClick={handleCreateArticle}
              className="w-full bg-[#f35e21] hover:bg-[#e0551a] text-white font-medium py-2.5 px-4 rounded-md transition-colors disabled:opacity-70"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Publishing...
                </span>
              ) : "Publish Article"}
            </button>

            {/* Status Messages */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {successMessage && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">{successMessage}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateArticle;