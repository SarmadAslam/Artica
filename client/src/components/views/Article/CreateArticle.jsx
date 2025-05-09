import endpoints from "@/constraints/apiConfig";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateArticle = () => {
  const navigate = useNavigate();
  const [newArticle, setNewArticle] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

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
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleCreateArticle = async () => {
    if (!newArticle.title || !newArticle.description) {
      setError("Title and description are required");
      return;
    }

    setIsLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("title", newArticle.title);
    formData.append("description", newArticle.description);
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create article");
      }

      const data = await response.json();
      setSuccessMessage("Article created successfully!");
      setTimeout(() => {
        navigate("/MyArticles");  // Changed from history.push
      }, 2000);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create a New Article</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 space-y-6">
          <div>
            <h2 className="text-base font-semibold text-gray-700 mb-3">Article Title</h2>
            <div className="border-b border-gray-300 pb-2">
              <input
                type="text"
                className="w-full text-gray-900 font-medium outline-none"
                placeholder="Enter your article title"
                value={newArticle.title}
                onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
              />
            </div>
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-700 mb-3">description</h2>
            <textarea
              value={newArticle.description}
              onChange={(e) => setNewArticle({ ...newArticle, description: e.target.value })}
              placeholder="Start writing your article here..."
              className="w-full h-64 border border-gray-300 rounded-md p-4 mb-12"
            />
          </div>

          <div>
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

        <div className="lg:w-1/3 space-y-6">
          <div className="sticky top-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-gray-700 mb-3">Cover Image</h3>
                <div
                  onClick={() => document.getElementById("coverImageInput").click()}
                  className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Cover preview"
                      className="w-full h-48 object-cover mb-2"
                    />
                  ) : (
                    <p className="text-gray-500">Drop your image here or browse</p>
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

              <div>
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
                </select>
              </div>

              <button
                onClick={handleCreateArticle}
                className="w-full bg-[#f35e21] hover:bg-[#e0551a] text-white font-medium py-2.5 px-4 rounded-md transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Publishing..." : "Publish Article"}
              </button>

              {error && <p className="text-red-500">{error}</p>}
              {successMessage && <p className="text-green-500">{successMessage}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateArticle;