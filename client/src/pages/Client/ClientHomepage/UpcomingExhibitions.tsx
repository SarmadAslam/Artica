// import React from "react";
// import Image2 from '@/assets/image2.jpeg';
// import Image3 from '@/assets/image3.jpeg';
// // import Image4 from '@/assets/image4.jpeg';

// const exhibitions = [
//   {
//     id: 1,
//     title: "Modern Perspectives 2025",
//     label: "Featured",
//     description: "A curated collection of contemporary artworks exploring modern themes.",
//     dateRange: "May 15 – June 30, 2025",
//     image: Image3,
//   },
//   {
//     id: 2,
//     title: "Sculptural Innovations",
//     label: "Upcoming",
//     description: "Exploring the boundaries of form and space in contemporary sculpture.",
//     dateRange: "July 10 – Aug 25, 2025",
//     image: Image2,
//   },
// ];

// const UpcomingExhibitions: React.FC = () => {
//   return (
//     <section className="py-12 px-6">
//       <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Exhibitions</h2>
//       <div className="grid md:grid-cols-2 gap-6">
//         {exhibitions.map((item) => (
//           <div key={item.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
//             <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
//             <div className="p-6">
//               <span className="inline-block text-xs font-semibold mb-2 px-3 py-1 rounded-full bg-[#FFD700] text-white">
//                 {item.label}
//               </span>
//               <h3 className="text-xl font-bold text-[#421983] mb-2">{item.title}</h3>
//               <p className="text-gray-600 mb-4">{item.description}</p>
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-gray-500">{item.dateRange}</span>
//                 <button className="bg-[#421983] hover:bg-[#2e105a] text-white text-sm font-medium px-4 py-2 rounded-lg">
//                   Learn More
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default UpcomingExhibitions;




// import React from "react";
// import Image2 from '@/assets/image2.jpeg';
// import Image3 from '@/assets/image3.jpeg';
// import { useFetchExhibitionsQuery } from "@/api/exhibitions"; // Import the hook from your backend API

// // More flexible image object
// const placeholderImages: Record<number, string> = {
//   1: Image3,
//   2: Image2,
// };

// const UpcomingExhibitions: React.FC = () => {
//   const { data: exhibitions = [], error, isLoading } = useFetchExhibitionsQuery(); // Fetch data using the hook

//   if (isLoading) {
//     return <div>Loading...</div>; // Show loading indicator while data is being fetched
//   }

// //   if (error) {
// //     return <div>Error: {error.message}</div>; // Show error message if fetching fails
// //   }

//   return (
//     <section className="py-12 px-6">
//       <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Exhibitions</h2>
//       <div className="grid md:grid-cols-2 gap-6">
//         {exhibitions.map((item: any) => (
//           <div key={item._id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
//             <img 
//               src={placeholderImages[Number(item._id) as keyof typeof placeholderImages] || 'default-image.jpg'} 
//               alt={item.title} 
//               className="h-48 w-full object-cover" 
//             />
//             <div className="p-6">
//               <span className="inline-block text-xs font-semibold mb-2 px-3 py-1 rounded-full bg-[#FFD700] text-white">
//                 {item.status}
//               </span>
//               <h3 className="text-xl font-bold text-[#421983] mb-2">{item.title}</h3>
//               <p className="text-gray-600 mb-4">{item.description}</p>
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-gray-500">
//                   {new Date(item.startDate).toLocaleDateString()} – {new Date(item.endDate).toLocaleDateString()}
//                 </span>
//                 <button className="bg-[#421983] hover:bg-[#2e105a] text-white text-sm font-medium px-4 py-2 rounded-lg">
//                   Learn More
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default UpcomingExhibitions;

import React from "react";
import Image1 from '@/assets/image1.jpeg';
import Image2 from '@/assets/image2.jpeg';
import { useFetchExhibitionsQuery } from "@/api/exhibitions";
import { useNavigate } from "react-router-dom"; // ✅ Step 1

const placeholderImages = [Image1, Image2];

const UpcomingExhibitions: React.FC = () => {
  const { data: exhibitions = [], error, isLoading } = useFetchExhibitionsQuery();
  const navigate = useNavigate(); // ✅ Step 2

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const upcomingExhibitions = exhibitions.filter(item => item.status === "upcoming");

  return (
    <section className="py-12 px-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Exhibitions</h2>
      <div className="flex space-x-6 overflow-x-auto w-full">
        {upcomingExhibitions.map((item: any) => {
          const imageSrc = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];

          return (
            <div key={item._id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition flex-grow">
              <img 
                src={imageSrc} 
                alt={item.title} 
                className="h-48 w-full object-cover" 
              />
              <div className="p-6">
                <span className="inline-block text-xs font-semibold mb-2 px-3 py-1 rounded-full bg-[#FFD700] text-white">
                  {item.status}
                </span>
                <h3 className="text-xl font-bold text-[#421983] mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {new Date(item.startDate).toLocaleDateString()} – {new Date(item.endDate).toLocaleDateString()}
                  </span>
                  <button
                    className="bg-[#421983] hover:bg-[#2e105a] text-white text-sm font-medium px-4 py-2 rounded-lg"
                    onClick={() => navigate(`/exhibition-artworks/${encodeURIComponent(item.title)}`)} // ✅ Step 3
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default UpcomingExhibitions;
