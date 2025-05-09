// import { useState } from "react";

// interface JobApplicationProps {
//   isOpen: boolean;
//   onClose: () => void;
//   jobTitle: string;
// }

// const JobApplication: React.FC<JobApplicationProps> = ({ isOpen, onClose, jobTitle }) => {
//   const [email, setEmail] = useState("");
//   const [contact, setContact] = useState("");
//   const [coverLetter, setCoverLetter] = useState<File | null>(null);
//   const [experience, setExperience] = useState("");
//   const [portfolio, setPortfolio] = useState<File | null>(null);

//   if (!isOpen) return null;

//   // Handle form submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Ensure all required fields are filled
//     if (!email || !contact || !experience) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     // Construct form data
//     const formData = new FormData();
//     formData.append("email", email);
//     formData.append("contact", contact);
//     formData.append("experience", experience);
//     if (coverLetter) formData.append("coverLetter", coverLetter);
//     if (portfolio) formData.append("portfolio", portfolio);

//     console.log("Submitting application:", Object.fromEntries(formData.entries()));

//     // You can now send formData to an API (e.g., using fetch or axios)
//     // Example: axios.post("/api/apply", formData)

//     alert("Application submitted successfully!");
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 flex items-start justify-center z-50 bg-black bg-opacity-50">
//       <div className="bg-white w-[90%] max-w-lg p-6 rounded-lg shadow-lg mt-4 relative">
//         <button onClick={onClose} className="absolute top-3 right-3 text-red-500 font-bold">
//           ✖
//         </button>
//         <h2 className="text-xl font-bold text-[#421983]">Apply for {jobTitle}</h2>

//         <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
//         <div>
//   <label className="block text-gray-700 font-medium">Email Address</label>
//   <input
//     type="email"
//     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//     value={email}
//     onChange={(e) => setEmail(e.target.value)}
//     required
//   />
// </div>


//           <div>
//             <label className="block text-gray-700 font-medium">Contact Number</label>
//             <input
//               type="text"
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//               value={contact}
//               onChange={(e) => setContact(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium">Cover Letter (Image)</label>
//             <input
//               type="file"
//               accept="image/*"
//               className="w-full p-2 border rounded-md"
//               onChange={(e) => setCoverLetter(e.target.files?.[0] || null)}
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium">Experience</label>
//             <textarea
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//               value={experience}
//               onChange={(e) => setExperience(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium">Portfolio (Image)</label>
//             <input
//               type="file"
//               accept="image/*"
//               className="w-full p-2 border rounded-md"
//               onChange={(e) => setPortfolio(e.target.files?.[0] || null)}
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-[#F35E21] text-white font-bold py-2 rounded-md hover:bg-[#D14E1A] transition duration-300"
//           >
//             Submit Application
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default JobApplication;

import { useState } from "react";
import { useSubmitApplicationMutation } from "@/api/jobApplicationApi";

interface JobApplicationProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
}

const JobApplication: React.FC<JobApplicationProps> = ({ isOpen, onClose, jobTitle }) => {
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [coverLetter, setCoverLetter] = useState<File | null>(null);
  const [experience, setExperience] = useState("");
  const [portfolio, setPortfolio] = useState<File | null>(null);

  const [submitApplication, { isLoading }] = useSubmitApplicationMutation();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !contact || !experience) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("experience", experience);
    formData.append("jobTitle", jobTitle);
    if (coverLetter) formData.append("coverLetter", coverLetter);
    if (portfolio) formData.append("portfolio", portfolio);

    try {
      await submitApplication(formData).unwrap();
      alert("Application submitted successfully!");
      onClose();
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Failed to submit application.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white w-[90%] max-w-lg p-6 rounded-lg shadow-lg mt-4 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-red-500 font-bold">
          ✖
        </button>
        <h2 className="text-xl font-bold text-[#421983]">Apply for {jobTitle}</h2>

        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium">Email Address</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Contact Number</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Cover Letter (Image)</label>
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 border rounded-md"
              onChange={(e) => setCoverLetter(e.target.files?.[0] || null)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Experience</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Portfolio (Image)</label>
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 border rounded-md"
              onChange={(e) => setPortfolio(e.target.files?.[0] || null)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#F35E21] text-white font-bold py-2 rounded-md hover:bg-[#D14E1A] transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobApplication;
