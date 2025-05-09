

// //correct code without merging backend 
// import { useState } from "react";
// import { useLocation } from "react-router-dom";

// export default function ParticipateInExhibition() {
//   const [tags, setTags] = useState<string[]>(["Nature", "Abstract"]);
//   const [availableForSale, setAvailableForSale] = useState(false);
//   const [previewImages, setPreviewImages] = useState<string[]>([]);

//   const { search } = useLocation();
//   const urlParams = new URLSearchParams(search);
//   const exhibitionTitle = urlParams.get("title") || "No Exhibition Title";

//   const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
//       e.preventDefault();
//       setTags([...tags, e.currentTarget.value.trim()]);
//       e.currentTarget.value = "";
//     }
//   };

//   const removeTag = (index: number) => {
//     setTags(tags.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h2 className="text-2xl font-bold text-[#421983] mb-6">Upload Artworks</h2>
//       <h3 className="text-xl text-[#421983] mb-4">{exhibitionTitle}</h3>

//       {/* File Upload Section */}
//       <div
//         className="border-2 border-dashed border-[#421983] rounded-lg p-6 flex flex-col items-center justify-center mb-8"
//         onDragOver={(e) => e.preventDefault()}
//         onDrop={(e) => {
//           e.preventDefault();
//           const files = Array.from(e.dataTransfer.files);
//           const imageFiles = files.filter((file) =>
//             ["image/jpeg", "image/png"].includes(file.type)
//           );
//           const previews = imageFiles.map((file) =>
//             URL.createObjectURL(file)
//           );
//           setPreviewImages((prev) => [...prev, ...previews]);
//         }}
//       >
//         <div className="text-[#F35E21] text-4xl mb-4">⬆️</div>
//         <p className="text-gray-600">Drag and drop your artwork files here</p>
//         <p className="text-gray-500">or</p>

//         {/* Hidden File Input */}
//         <input
//           type="file"
//           id="fileUploadDrag"
//           accept="image/jpeg,image/png"
//           multiple
//           className="hidden"
//           onChange={(e) => {
//             const files = Array.from(e.target.files || []);
//             const imageFiles = files.filter((file) =>
//               ["image/jpeg", "image/png"].includes(file.type)
//             );
//             const previews = imageFiles.map((file) =>
//               URL.createObjectURL(file)
//             );
//             setPreviewImages((prev) => [...prev, ...previews]);
//           }}
//         />

//         <label
//           htmlFor="fileUploadDrag"
//           className="mt-4 px-4 py-2 bg-[#421983] text-white rounded-md hover:bg-[#341462] cursor-pointer"
//         >
//           Browse Files
//         </label>

//         <p className="text-gray-400 text-sm mt-2">
//           Maximum file size: 10MB | Supported formats: JPG, PNG
//         </p>

//         {/* Preview Images */}
//         {previewImages.length > 0 && (
//           <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
//             {previewImages.map((src, index) => (
//               <img
//                 key={index}
//                 src={src}
//                 alt={`Preview ${index + 1}`}
//                 className="w-full h-32 object-cover rounded border"
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Form Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         {/* Left Side */}
//         <div className="flex flex-col gap-4">
//           <div>
//             <label className="text-gray-700 text-sm ">Artwork Title</label>
//             <input
//               type="text"
//               placeholder="Enter artwork title"
//               className="w-full mt-1 border rounded-md p-2 border-[#F35E21] focus:outline-none focus:ring-2 focus:ring-[#421983]"
//             />
//           </div>
//           <div>
//             <label className="text-gray-700 text-sm">Description</label>
//             <textarea
//               placeholder="Describe your artwork"
//               className="w-full mt-1 border border-[#F35E21] rounded-md p-2 h-24 focus:outline-none focus:ring-2 focus:ring-[#421983]"
//             ></textarea>
//           </div>
//           <div>
//             <label className="text-gray-700 text-sm">Category</label>
//             <select className="w-full mt-1 border border-[#F35E21] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#421983]">
//               <option>Digital Art</option>
//               <option>Painting</option>
//               <option>Sketch</option>
//               <option>Photography</option>
//             </select>
//           </div>
//         </div>

//         {/* Right Side */}
//         <div className="flex flex-col gap-4">
//           <div>
//             <label className="text-gray-700 text-sm">Tags</label>
//             <div className="flex flex-wrap gap-2 mt-1 p-2 border border-[#F35E21] rounded-md min-h-[48px]">
//               {tags.map((tag, index) => (
//                 <span
//                   key={index}
//                   className="flex items-center bg-[#FFD700] text-black px-2 py-1 rounded-full text-sm"
//                 >
//                   {tag}
//                   <button
//                     onClick={() => removeTag(index)}
//                     className="ml-2 text-red-600 hover:text-red-800"
//                   >
//                     ×
//                   </button>
//                 </span>
//               ))}
//               <input
//                 type="text"
//                 onKeyDown={handleTagKeyDown}
//                 placeholder="Add tags (press Enter)"
//                 className="flex-1 min-w-[100px] outline-none"
//               />
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <label className="text-gray-700 text-sm">Available for Sale</label>
//             <label className="relative inline-flex items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 className="sr-only peer"
//                 checked={availableForSale}
//                 onChange={(e) => setAvailableForSale(e.target.checked)}
//               />
//               <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#421983] rounded-full peer peer-checked:bg-[#421983]"></div>
//             </label>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="text-gray-700 text-sm">Price (Rs)</label>
//               <input
//                 type="number"
//                 placeholder="0.00"
//                 disabled={!availableForSale}
//                 className={`w-full mt-1 border rounded-md p-2 focus:outline-none focus:ring-2 ${availableForSale
//                   ? "border-[#F35E21] focus:ring-[#421983]"
//                   : "border-gray-300 bg-gray-100 cursor-not-allowed"
//                 }`}
//               />
//             </div>
//             <div>
//               <label className="text-gray-700 text-sm">Size</label>
//               <select className="w-full mt-1 border border-[#F35E21] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#421983]">
//                 <option>Small</option>
//                 <option>Medium</option>
//                 <option>Large</option>
//               </select>
//             </div>
//           </div>
//           {availableForSale && (
//             <div>
//               <label className="text-gray-700 text-sm">Sell As</label>
//               <select className="w-full mt-1 border border-[#F35E21] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#421983]">
//                 <option value="">Select option</option>
//                 <option value="digital">Digital</option>
//                 <option value="physical">Physical</option>
//               </select>
//             </div>
//           )}

//           <button className="mt-4 px-6 py-2 bg-[#F35E21] text-white rounded-md hover:bg-[#d44e14] w-fit self-end">
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


//integrating with backend but not working
// import { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { useSubmitArtworkMutation } from "@/api/participateInExhibitionApi"; // Adjust the path to your API file

// export default function ParticipateInExhibition() {
//   const [tags, setTags] = useState<string[]>(["Nature", "Abstract"]);
//   const [availableForSale, setAvailableForSale] = useState(false);
//   const [previewImages, setPreviewImages] = useState<string[]>([]);
//   const [artworkTitle, setArtworkTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [price, setPrice] = useState(0);
//   const [size, setSize] = useState("");
//   const [sellAs, setSellAs] = useState("");

//   const { search } = useLocation();
//   const urlParams = new URLSearchParams(search);
//   const exhibitionTitle = urlParams.get("title") || "No Exhibition Title";

//   const [submitArtwork, { isLoading, error }] = useSubmitArtworkMutation();
//   const [imageFiles, setImageFiles] = useState<File[]>([]); // Add this state


//   const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
//       e.preventDefault();
//       setTags([...tags, e.currentTarget.value.trim()]);
//       e.currentTarget.value = "";
//     }
//   };

//   const removeTag = (index: number) => {
//     setTags(tags.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Create FormData to handle file uploads
//     const formData = new FormData();
//     formData.append("title", artworkTitle);
//     formData.append("description", description);
//     formData.append("category", category);
//     formData.append("tags", JSON.stringify(tags));
//     formData.append("availableForSale", String(availableForSale));
//     formData.append("price", String(price));
//     formData.append("size", size);
//     formData.append("sellAs", sellAs);
//     formData.append("exhibitionTitle", exhibitionTitle);

//     // Append images to the FormData
//     previewImages.forEach((file, index) => {
//       formData.append("images", file); // Assuming file is an image URL here, but you might need to handle this differently for actual file uploads
//     });

//     try {
//       const response = await submitArtwork(formData).unwrap();
//       if (response) {
//         console.log("Artwork submitted successfully");
//         // You can add a success message or redirect the user here
//       }
//     } catch (err) {
//       console.error("Submission failed:", err);
//       // Optionally, display an error message to the user
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h2 className="text-2xl font-bold text-[#421983] mb-6">Upload Artworks</h2>
//       <h3 className="text-xl text-[#421983] mb-4">{exhibitionTitle}</h3>

//       {/* File Upload Section */}
//       <div
//         className="border-2 border-dashed border-[#421983] rounded-lg p-6 flex flex-col items-center justify-center mb-8"
//         onDragOver={(e) => e.preventDefault()}
//         onDrop={(e) => {
//           e.preventDefault();
//           const files = Array.from(e.dataTransfer.files);
//           const imageFiles = files.filter((file) =>
//             ["image/jpeg", "image/png"].includes(file.type)
//           );
//           const previews = imageFiles.map((file) =>
//             URL.createObjectURL(file)
//           );
//           setPreviewImages((prev) => [...prev, ...previews]);
//         }}
//       >
//         <div className="text-[#F35E21] text-4xl mb-4">⬆️</div>
//         <p className="text-gray-600">Drag and drop your artwork files here</p>
//         <p className="text-gray-500">or</p>

//         {/* Hidden File Input */}
//         <input
//           type="file"
//           id="fileUploadDrag"
//           accept="image/jpeg,image/png"
//           multiple
//           className="hidden"
//           onChange={(e) => {
//             const files = Array.from(e.target.files || []);
//             const imageFiles = files.filter((file) =>
//               ["image/jpeg", "image/png"].includes(file.type)
//             );
//             const previews = imageFiles.map((file) =>
//               URL.createObjectURL(file)
//             );
//             setPreviewImages((prev) => [...prev, ...previews]);
//           }}
//         />

//         <label
//           htmlFor="fileUploadDrag"
//           className="mt-4 px-4 py-2 bg-[#421983] text-white rounded-md hover:bg-[#341462] cursor-pointer"
//         >
//           Browse Files
//         </label>

//         <p className="text-gray-400 text-sm mt-2">
//           Maximum file size: 10MB | Supported formats: JPG, PNG
//         </p>

//         {/* Preview Images */}
//         {previewImages.length > 0 && (
//           <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
//             {previewImages.map((src, index) => (
//               <img
//                 key={index}
//                 src={src}
//                 alt={`Preview ${index + 1}`}
//                 className="w-full h-32 object-cover rounded border"
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Form Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         <div className="flex flex-col gap-4">
//           <div>
//             <label className="text-gray-700 text-sm">Artwork Title</label>
//             <input
//               type="text"
//               value={artworkTitle}
//               onChange={(e) => setArtworkTitle(e.target.value)}
//               placeholder="Enter artwork title"
//               className="w-full mt-1 border rounded-md p-2 border-[#F35E21] focus:outline-none focus:ring-2 focus:ring-[#421983]"
//             />
//           </div>
//           <div>
//             <label className="text-gray-700 text-sm">Description</label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Describe your artwork"
//               className="w-full mt-1 border border-[#F35E21] rounded-md p-2 h-24 focus:outline-none focus:ring-2 focus:ring-[#421983]"
//             ></textarea>
//           </div>
//           <div>
//             <label className="text-gray-700 text-sm">Category</label>
//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="w-full mt-1 border border-[#F35E21] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#421983]"
//             >
//               <option>Digital Art</option>
//               <option>Painting</option>
//               <option>Sketch</option>
//               <option>Photography</option>
//             </select>
//           </div>
//         </div>

//         <div className="flex flex-col gap-4">
//           <div>
//             <label className="text-gray-700 text-sm">Tags</label>
//             <div className="flex flex-wrap gap-2 mt-1 p-2 border border-[#F35E21] rounded-md min-h-[48px]">
//               {tags.map((tag, index) => (
//                 <span
//                   key={index}
//                   className="flex items-center bg-[#FFD700] text-black px-2 py-1 rounded-full text-sm"
//                 >
//                   {tag}
//                   <button
//                     onClick={() => removeTag(index)}
//                     className="ml-2 text-red-600 hover:text-red-800"
//                   >
//                     ×
//                   </button>
//                 </span>
//               ))}
//               <input
//                 type="text"
//                 onKeyDown={handleTagKeyDown}
//                 placeholder="Add tags (press Enter)"
//                 className="flex-1 min-w-[100px] outline-none"
//               />
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <label className="text-gray-700 text-sm">Available for Sale</label>
//             <label className="relative inline-flex items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 className="sr-only peer"
//                 checked={availableForSale}
//                 onChange={(e) => setAvailableForSale(e.target.checked)}
//               />
//               <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#421983] rounded-full peer peer-checked:bg-[#421983]"></div>
//             </label>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="text-gray-700 text-sm">Price (Rs)</label>
//               <input
//                 type="number"
//                 value={price}
//                 onChange={(e) => setPrice(Number(e.target.value))}
//                 placeholder="0.00"
//                 disabled={!availableForSale}
//                 className={`w-full mt-1 border rounded-md p-2 focus:outline-none focus:ring-2 ${availableForSale
//                   ? "border-[#F35E21] focus:ring-[#421983]"
//                   : "border-gray-300 bg-gray-100 cursor-not-allowed"
//                 }`}
//               />
//             </div>
//             <div>
//               <label className="text-gray-700 text-sm">Size</label>
//               <select
//                 value={size}
//                 onChange={(e) => setSize(e.target.value)}
//                 className="w-full mt-1 border border-[#F35E21] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#421983]"
//               >
//                 <option>Small</option>
//                 <option>Medium</option>
//                 <option>Large</option>
//               </select>
//             </div>
//           </div>

//           <div>
//             <label className="text-gray-700 text-sm">Sell As</label>
//             <select
//               value={sellAs}
//               onChange={(e) => setSellAs(e.target.value)}
//               className="w-full mt-1 border border-[#F35E21] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#421983]"
//             >
//               <option>Original</option>
//               <option>Print</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Submit Button */}
//       <div className="flex justify-center">
//         <button
//           onClick={handleSubmit}
//           className="px-8 py-2 bg-[#421983] text-white rounded-md hover:bg-[#341462] disabled:bg-gray-400"
//           disabled={isLoading}
//         >
//           {isLoading ? "Submitting..." : "Submit Artwork"}
//         </button>
//       </div>
//     </div>
//   );
// }


//deepseek solution
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSubmitArtworkMutation } from "@/api/participateInExhibitionApi";

export default function ParticipateInExhibition() {
  const [tags, setTags] = useState<string[]>(["Nature", "Abstract"]);
  const [availableForSale, setAvailableForSale] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [artworkTitle, setArtworkTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState("");
  const [sellAs, setSellAs] = useState("");

  const { search } = useLocation();
  const urlParams = new URLSearchParams(search);
  const exhibitionTitle = urlParams.get("title") || "No Exhibition Title";

  const [submitArtwork, { isLoading, error }] = useSubmitArtworkMutation();

  // Cleanup preview URLs when component unmounts
  useEffect(() => {
    return () => {
      previewImages.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewImages]);

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
      e.preventDefault();
      setTags([...tags, e.currentTarget.value.trim()]);
      e.currentTarget.value = "";
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", artworkTitle);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("tags", JSON.stringify(tags));
    formData.append("availableForSale", String(availableForSale));
    formData.append("price", String(price));
    formData.append("size", size);
    formData.append("sellAs", sellAs);
    formData.append("exhibitionTitle", exhibitionTitle);

    // Append actual File objects instead of preview URLs
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await submitArtwork(formData).unwrap();
      console.log("Artwork submitted successfully", response);
      // Handle success (e.g., show success message, redirect, etc.)
    } catch (err) {
      console.error("Submission failed:", err);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-[#421983] mb-6">Upload Artworks</h2>
      <h3 className="text-xl text-[#421983] mb-4">{exhibitionTitle}</h3>

      {/* File Upload Section */}
      <div
        className="border-2 border-dashed border-[#421983] rounded-lg p-6 flex flex-col items-center justify-center mb-8"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const files = Array.from(e.dataTransfer.files);
          const validImageFiles = files.filter((file) =>
            ["image/jpeg", "image/png"].includes(file.type)
          );
          setImageFiles((prev) => [...prev, ...validImageFiles]);
          const previews = validImageFiles.map((file) => URL.createObjectURL(file));
          setPreviewImages((prev) => [...prev, ...previews]);
        }}
      >
        <div className="text-[#F35E21] text-4xl mb-4">⬆️</div>
        <p className="text-gray-600">Drag and drop your artwork files here</p>
        <p className="text-gray-500">or</p>

        {/* Hidden File Input */}
        <input
          type="file"
          id="fileUploadDrag"
          accept="image/jpeg,image/png"
          multiple
          className="hidden"
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            const validImageFiles = files.filter((file) =>
              ["image/jpeg", "image/png"].includes(file.type)
            );
            setImageFiles((prev) => [...prev, ...validImageFiles]);
            const previews = validImageFiles.map((file) => URL.createObjectURL(file));
            setPreviewImages((prev) => [...prev, ...previews]);
          }}
        />

        <label
          htmlFor="fileUploadDrag"
          className="mt-4 px-4 py-2 bg-[#421983] text-white rounded-md hover:bg-[#341462] cursor-pointer"
        >
          Browse Files
        </label>

        <p className="text-gray-400 text-sm mt-2">
          Maximum file size: 10MB | Supported formats: JPG, PNG
        </p>

        {/* Preview Images */}
        {previewImages.length > 0 && (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
            {previewImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded border"
              />
            ))}
          </div>
        )}
      </div>

      {/* Form Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-gray-700 text-sm">Artwork Title</label>
            <input
              type="text"
              value={artworkTitle}
              onChange={(e) => setArtworkTitle(e.target.value)}
              placeholder="Enter artwork title"
              className="w-full mt-1 border rounded-md p-2 border-[#F35E21] focus:outline-none focus:ring-2 focus:ring-[#421983]"
            />
          </div>
          <div>
            <label className="text-gray-700 text-sm">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your artwork"
              className="w-full mt-1 border border-[#F35E21] rounded-md p-2 h-24 focus:outline-none focus:ring-2 focus:ring-[#421983]"
            ></textarea>
          </div>
          <div>
            <label className="text-gray-700 text-sm">Category</label>
            {/* <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full mt-1 border border-[#F35E21] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#421983]"
            >
              <option>Digital Art</option>
              <option>Painting</option>
              <option>Sketch</option>
              <option>Photography</option>
            </select> */}
            <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="w-full mt-1 border border-[#F35E21] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#421983]"
>
  <option value="">-- Select Category --</option>
  <option value="Digital Art">Digital Art</option>
  <option value="Painting">Painting</option>
  <option value="Sketch">Sketch</option>
  <option value="Photography">Photography</option>
</select>

          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-gray-700 text-sm">Tags</label>
            <div className="flex flex-wrap gap-2 mt-1 p-2 border border-[#F35E21] rounded-md min-h-[48px]">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="flex items-center bg-[#FFD700] text-black px-2 py-1 rounded-full text-sm"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(index)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                onKeyDown={handleTagKeyDown}
                placeholder="Add tags (press Enter)"
                className="flex-1 min-w-[100px] outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-gray-700 text-sm">Available for Sale</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={availableForSale}
                onChange={(e) => setAvailableForSale(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#421983] rounded-full peer peer-checked:bg-[#421983]"></div>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-700 text-sm">Price (Rs)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="0.00"
                disabled={!availableForSale}
                className={`w-full mt-1 border rounded-md p-2 focus:outline-none focus:ring-2 ${availableForSale
                  ? "border-[#F35E21] focus:ring-[#421983]"
                  : "border-gray-300 bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>
            <div>
              <label className="text-gray-700 text-sm">Size</label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full mt-1 border border-[#F35E21] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#421983]"
              >
                {/* <option>Small</option>
                <option>Medium</option>
                <option>Large</option> */}
                <option value="">-- Select Size --</option>
<option value="Small">Small</option>
<option value="Medium">Medium</option>
<option value="Large">Large</option>

              </select>
            </div>
          </div>

          {/* <div>
            <label className="text-gray-700 text-sm">Sell As</label>
            <select
              value={sellAs}
              onChange={(e) => setSellAs(e.target.value)}
              className="w-full mt-1 border border-[#F35E21] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#421983]"
            >
              <option>Original</option>
              <option>Print</option>
            </select>
          </div> */}
          <div>
  <label className="text-gray-700 text-sm">Sell As</label>
  <select
    value={sellAs}
    onChange={(e) => setSellAs(e.target.value)}
    className="w-full mt-1 border border-[#F35E21] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#421983]"
  >
    <option value="">-- Select Sell As --</option>
    <option value="Original">Original</option>
    <option value="Print">Print</option>
   
  </select>
</div>

        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="px-8 py-2 bg-[#421983] text-white rounded-md hover:bg-[#341462] disabled:bg-gray-400"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit Artwork"}
        </button>
      </div>
    </div>
  );
}