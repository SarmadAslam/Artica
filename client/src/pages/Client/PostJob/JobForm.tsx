// import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const jobCategories = [
//   "Custom Artwork & Commissions",
//   "Illustration & Design",
//   "Painting & Drawing",
//   "Handmade & Decorative Art",
//   "Craft & DIY Projects",
//   "Teaching & Workshops",
//   "Restoration & Repair",
//   "Art for Events & Business",
// ];

// const jobTypes = ["Freelance", "Full-time", "Part-time", "Contract"];
// const workplaceTypes = ["Remote", "On-Site", "Hybrid"];
// const budgetOptions = ["Rs 1 to 5k", "Rs 6 to 15k", "Rs 16 to 25k", "Other"];

// const JobForm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [formData, setFormData] = useState({
//     title: location.state?.jobTitle || "", // Add this field (modify as needed)

//     description: "",
//     selectedCategory: [] as string[],
//     jobType: "",
//     workplaceType: "",
//     experienceLevel: "",
//     startDate: "",
//     endDate: "",
//     skillsRequired: "",
//     budget: "",
//     customBudget: "",
//   });

//   const toggleCategory = (category: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       selectedCategory: prev.selectedCategory.includes(category)
//         ? prev.selectedCategory.filter((c) => c !== category)
//         : [...prev.selectedCategory, category],
//     }));
//   };

//   useEffect(() => {
//     if (location.state?.jobTitle) {
//       setFormData((prev) => ({ ...prev, title: location.state.jobTitle }));
//     }
//   }, [location.state?.jobTitle]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {
//     const existingJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
//     const updatedJobs = [...existingJobs, formData];
//     localStorage.setItem("jobs", JSON.stringify(updatedJobs));

//     navigate("/job-details", { state: formData });
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
//       <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
//         <h2 className="text-2xl font-bold text-[#F35E21] mb-6">Post a Job</h2>

//         {/* Job Title Input (Pre-filled from Title.tsx) */}
//         <label className="block text-[#421983] font-medium mb-2">Job Title</label>
//         <input
//           type="text"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F35E21]"
//           placeholder="Enter job title..."
//         />

//         {/* Job Description */}
//         <label className="block text-[#421983] font-medium mb-2">Job Description</label>
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F35E21]"
//           rows={4}
//           placeholder="Describe the job requirements..."
//         />

//         {/* Category Selection */}
//         <label className="block text-[#421983] font-medium mt-4 mb-2">Select Category</label>
//         <div className="flex flex-wrap gap-2">
//           {jobCategories.map((category) => (
//             <button
//               key={category}
//               className={`px-4 py-2 rounded-lg text-sm ${
//                 formData.selectedCategory.includes(category) ? "bg-[#F35E21] text-white" : "bg-gray-200 text-black"
//               }`}
//               onClick={() => toggleCategory(category)}
//             >
//               {category}
//             </button>
//           ))}
//         </div>

//         {/* Job Type */}
//         <label className="block text-[#421983] font-medium mt-4 mb-2">Job Type</label>
//         <div className="flex gap-4">
//           {jobTypes.map((type) => (
//             <label key={type} className="flex items-center space-x-2">
//               <input type="radio" name="jobType" value={type} checked={formData.jobType === type} onChange={handleChange} className="accent-[#F35E21]" />
//               <span>{type}</span>
//             </label>
//           ))}
//         </div>

//         {/* Workplace Type */}
//         <label className="block text-[#421983] font-medium mt-4 mb-2">Workplace Type</label>
//         <div className="flex gap-4">
//           {workplaceTypes.map((type) => (
//             <label key={type} className="flex items-center space-x-2">
//               <input type="radio" name="workplaceType" value={type} checked={formData.workplaceType === type} onChange={handleChange} className="accent-[#F35E21]" />
//               <span>{type}</span>
//             </label>
//           ))}
//         </div>

//         {/* Experience Level */}
//         <label className="block text-[#421983] font-medium mt-4 mb-2">Experience Level</label>
//         <input
//           type="text"
//           name="experienceLevel"
//           value={formData.experienceLevel}
//           onChange={handleChange}
//           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F35E21]"
//           placeholder="Enter required experience level (e.g., Beginner, Intermediate, Expert)"
//         />

//         {/* Project Duration */}
//         <label className="block text-[#421983] font-medium mt-4 mb-2">Project Duration</label>
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="text-sm text-[#421983]">Start Date</label>
//             <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F35E21]" />
//           </div>
//           <div>
//             <label className="text-sm text-[#421983]">End Date</label>
//             <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F35E21]" />
//           </div>
//         </div>

//         {/* Budget Selection */}
//         <label className="block text-[#421983] font-medium mt-4 mb-2">Budget</label>
//         <select name="budget" value={formData.budget} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F35E21]">
//           <option value="">Select Budget</option>
//           {budgetOptions.map((option) => (
//             <option key={option} value={option}>{option}</option>
//           ))}
//         </select>

//         {formData.budget === "Other" && (
//           <div className="mt-3">
//             <label className="block text-[#421983] font-medium mb-2">Enter Custom Budget (Rs)</label>
//             <input
//               type="number"
//               name="customBudget"
//               value={formData.customBudget}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F35E21]"
//               placeholder="Enter amount..."
//             />
//           </div>
//         )}

//         {/* Submit Button */}
//         <button onClick={handleSubmit} className="mt-6 w-full bg-[#FFD700] text-black font-medium px-6 py-3 rounded-lg hover:bg-opacity-80 transition">
//           Post Job
//         </button>
//       </div>
//     </div>
//   );
// };

// export default JobForm;


import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePostJobMutation } from "@/api/jobApi"; // Import the RTK Query mutation hook

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

const JobForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [addJob, { isLoading, error }] = usePostJobMutation(); // ✅ Correct mutation hook

  const [formData, setFormData] = useState({
    title: location.state?.jobTitle || "",
    description: "",
    selectedCategory: [] as string[],
    jobType: "",
    workplaceType: "",
    experienceLevel: "",
    startDate: "",
    endDate: "",
    skillsRequired: "",
    budget: "",
    customBudget: "",
  });

  const toggleCategory = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedCategory: prev.selectedCategory.includes(category)
        ? prev.selectedCategory.filter((c) => c !== category)
        : [...prev.selectedCategory, category],
    }));
  };

  useEffect(() => {
    if (location.state?.jobTitle) {
      setFormData((prev) => ({ ...prev, title: location.state.jobTitle }));
    }
  }, [location.state?.jobTitle]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const newJob = {
        title: formData.title,
        description: formData.description,
        category: formData.selectedCategory,  // ✅ Ensure this matches backend enum
        jobType: formData.jobType,
        workplaceType: formData.workplaceType,
        experienceLevel: formData.experienceLevel,
        startDate: new Date(formData.startDate), // ✅ Convert date correctly
        endDate: new Date(formData.endDate),
        skillsRequired: formData.skillsRequired,
        budget: formData.budget,
        customBudget: formData.budget === "Other" ? Number(formData.customBudget) : null,
      };

      const response = await addJob(newJob).unwrap(); // ✅ Correct way to call mutation
      console.log("Job posted successfully:", response);
      navigate("/clienthomepage", { state: newJob }); // ✅ Redirect on success
    } catch (err) {
      console.error("Failed to post job:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-[#F35E21] mb-6">Post a Job</h2>

        {/* Job Title */}
        <label className="block text-[#421983] font-medium mb-2">Job Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F35E21]"
          placeholder="Enter job title..."
        />

        {/* Job Description */}
        <label className="block text-[#421983] font-medium mb-2">Job Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F35E21]"
          rows={4}
          placeholder="Describe the job requirements..."
        />

        {/* Category Selection */}
        <label className="block text-[#421983] font-medium mt-4 mb-2">Select Category</label>
        <div className="flex flex-wrap gap-2">
          {jobCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={`px-4 py-2 rounded-lg text-sm ${
                formData.selectedCategory.includes(category) ? "bg-[#F35E21] text-white" : "bg-gray-200 text-black"
              }`}
              onClick={() => toggleCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Job Type */}
        <label className="block text-[#421983] font-medium mt-4 mb-2">Job Type</label>
        <div className="flex gap-4">
          {jobTypes.map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input type="radio" name="jobType" value={type} checked={formData.jobType === type} onChange={handleChange} className="accent-[#F35E21]" />
              <span>{type}</span>
            </label>
          ))}
        </div>

        {/* Workplace Type */}
        <label className="block text-[#421983] font-medium mt-4 mb-2">Workplace Type</label>
        <div className="flex gap-4">
          {workplaceTypes.map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input type="radio" name="workplaceType" value={type} checked={formData.workplaceType === type} onChange={handleChange} className="accent-[#F35E21]" />
              <span>{type}</span>
            </label>
          ))}
        </div>
        {/* experience level */}
        <label className="block text-[#421983] font-medium mt-4 mb-2">Experience Level</label>
        <input
          type="text"
          name="experienceLevel"
          value={formData.experienceLevel}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F35E21]"
          placeholder="Enter required experience level (e.g., Beginner, Intermediate, Expert)"
        />

        {/* duration */}
          <label className="block text-[#421983] font-medium mt-4 mb-2">Project Duration</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-primary">Start Date</label>
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" />
          </div>
          <div>
            <label className="text-sm text-primary">End Date</label>
            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" />
          </div>
        </div>


        {/* Budget Selection */}
        <label className="block text-[#421983] font-medium mt-4 mb-2">Budget</label>
        <select name="budget" value={formData.budget} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg">
          <option value="">Select Budget</option>
          {budgetOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        {formData.budget === "Other" && (
          <div className="mt-3">
            <label className="block text-[#421983] font-medium mb-2">Enter Custom Budget (Rs)</label>
            <input
              type="number"
              name="customBudget"
              value={formData.customBudget}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter amount..."
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-[#FFD700] text-black font-medium px-6 py-3 rounded-lg hover:bg-opacity-80 transition"
          disabled={isLoading}
        >
          {isLoading ? "Posting..." : "Post Job"}
        </button>

        {error && <p className="text-red-500 mt-3">Failed to post job. Try again.</p>}
      </div>
    </div>
  );
};

export default JobForm;
