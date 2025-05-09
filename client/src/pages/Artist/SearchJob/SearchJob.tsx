
import React, { useState } from "react";
import { useFetchAllJobsQuery } from "../../../api/jobApi";
import JobCard from "./JobCard";

const jobCategories = [
  "Custom Artwork & Commissions",
  "Illustration & Design",
  "Painting & Drawing",
  "Handmade & Decorative Art",
  "Craft & DIY Projects",
  "Teaching & Workshops",
  "Restoration & Repair",
  "Art for Events & Business",
];

const jobTypes = ["Freelance", "Full-time", "Part-time", "Contract"];
const workplaceTypes = ["Remote", "On-Site", "Hybrid"];
const budgetOptions = ["Rs 1 to 5k", "Rs 6 to 15k", "Rs 16 to 25k", "Other"];

interface Job {
  _id: string;
  title: string;
  description: string;
  category: string[];
  jobType: string;
  workplaceType: string;
  budget: string; // This will be one of the budgetOptions values
  customBudget?: number; // Only present if budget === "Other"
  experienceLevel?: string;
  startDate?: string;
  endDate?: string;
}

const SearchJob: React.FC = () => {
  const { data: jobs = [], isLoading, isError } = useFetchAllJobsQuery({});

  // Debug: Log the first job to check data structure
  React.useEffect(() => {
    if (jobs.length > 0) {
      console.log("Sample job data:", jobs[0]);
      console.log("Budgets in data:", jobs.map((job:Job) => ({
        budget: job.budget,
        customBudget: job.customBudget
      })));
    }
  }, [jobs]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedWorkplace, setSelectedWorkplace] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [customBudget, setCustomBudget] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) return <p>Loading jobs...</p>;
  if (isError) return <p>Error loading jobs. Please try again.</p>;

  const filteredJobs = jobs.filter((job: Job) => {
    // Category filter
    if (selectedCategory && !job.category.includes(selectedCategory)) {
      return false;
    }

    // Job type filter
    if (selectedJobType && job.jobType !== selectedJobType) {
      return false;
    }

    // Workplace type filter
    if (selectedWorkplace && job.workplaceType !== selectedWorkplace) {
      return false;
    }

    // Budget filter - Fixed implementation
    if (selectedBudget) {
      if (selectedBudget === "Other") {
        // For "Other" option, we need to check customBudget
        if (!customBudget) return false; // No custom budget specified
        
        const minBudget = parseInt(customBudget);
        if (isNaN(minBudget)) return false;
        
        // Case 1: Job has a customBudget field (preferred)
        if (job.customBudget !== undefined) {
          return job.customBudget >= minBudget;
        }
        
        // Case 2: Job doesn't have customBudget but budget is "Other"
        // This shouldn't happen based on your schema, but just in case
        if (job.budget === "Other") {
          return false; // Can't compare without customBudget value
        }
        
        // Case 3: Job has a predefined budget range but we're looking for "Other"
        // This job shouldn't match
        return false;
      } else {
        // For predefined ranges, check the budget string
        // Only include jobs that match the selected predefined range
        return job.budget === selectedBudget;
      }
    }

    // Search query filter
    if (searchQuery &&
      !job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !job.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  console.log("Filtering results:", {
    selectedCategory,
    selectedJobType,
    selectedWorkplace,
    selectedBudget,
    customBudget,
    filteredCount: filteredJobs.length,
    totalJobs: jobs.length
  });

  return (
    <div className="flex flex-col md:flex-row p-6 gap-6 bg-gray-100 min-h-screen">
      {/* Left Section: Search & Filters */}
      <div className="w-full md:w-1/4 flex flex-col gap-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search for jobs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F35E21]"
        />

        {/* Filters Box */}
        <div className="w-full bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-semibold text-[#F35E21] mb-3">Filters</h2>

          <button
            className={`w-full p-2 rounded-lg mb-3 ${
              !selectedCategory && !selectedJobType && !selectedWorkplace && !selectedBudget && !searchQuery
                ? "bg-[#F35E21] text-white"
                : "bg-gray-200"
            }`}
            onClick={() => {
              setSelectedCategory("");
              setSelectedJobType("");
              setSelectedWorkplace("");
              setSelectedBudget("");
              setCustomBudget("");
              setSearchQuery("");
            }}
          >
            All Jobs
          </button>

          <label className="block font-medium text-gray-700">Category</label>
          <select
            className="w-full p-2 border rounded-lg mb-3"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {jobCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <label className="block font-medium text-gray-700">Job Type</label>
          <div className="flex flex-col gap-2 mb-3">
            {jobTypes.map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="jobType"
                  value={type}
                  checked={selectedJobType === type}
                  onChange={(e) => setSelectedJobType(e.target.value)}
                  className="accent-[#F35E21]"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>

          <label className="block font-medium text-gray-700">Workplace Type</label>
          <div className="flex flex-col gap-2 mb-3">
            {workplaceTypes.map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="workplaceType"
                  value={type}
                  checked={selectedWorkplace === type}
                  onChange={(e) => setSelectedWorkplace(e.target.value)}
                  className="accent-[#F35E21]"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>

          <label className="block font-medium text-gray-700">Budget</label>
          <select
            className="w-full p-2 border rounded-lg mb-3"
            value={selectedBudget}
            onChange={(e) => {
              setSelectedBudget(e.target.value);
              if (e.target.value !== "Other") {
                setCustomBudget("");
              }
            }}
          >
            <option value="">Select Budget</option>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          {selectedBudget === "Other" && (
            <input
              type="number"
              placeholder="Enter minimum budget"
              value={customBudget}
              onChange={(e) => setCustomBudget(e.target.value)}
              className="w-full p-2 border rounded-lg mb-3"
              min="0"
            />
          )}
        </div>
      </div>

      {/* Jobs Section */}
      <div className="w-full md:w-3/4 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Job Listings</h2>
        {/* 3 cards : grid-cols-1 md:grid-cols-2 lg:grid-cols-3 */}
        <div className="grid grid-cols-1 gap-6"> 
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job: Job) => (
              <JobCard key={job._id} job={job}  />
            ))
          ) : (
            <div className="col-span-full text-center">
              <p className="text-gray-500">No jobs found matching the filters.</p>
              <p className="text-sm text-gray-400 mt-2">
                Current filters: {selectedCategory || 'None'} | {selectedJobType || 'None'} | {selectedWorkplace || 'None'} | 
                {selectedBudget === "Other" && customBudget 
                  ? ` Rs ${customBudget} & above` 
                  : selectedBudget 
                  ? ` ${selectedBudget}` 
                  : ' None'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchJob;