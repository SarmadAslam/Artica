

// import React from "react";
// import { useParams } from "react-router-dom"; // Add this

// const artworks = [
//   {
//     id: 1,
//     title: 'Geometric Dreams',
//     category: 'Digital',
//     tags: ['Abstract'],
//     price: 'Rs 2,500',
//     image: 'https://images.unsplash.com/photo-1581091870627-3a9f9441d2e8',
//     size: 'Medium',
//     sellAs: 'Digital',
//     description: 'An abstract exploration of geometric forms in a dream-like sequence.'
//   },
//   {
//     id: 2,
//     title: 'Sunset Valley',
//     category: 'Traditional',
//     tags: ['Landscape', 'Nature'],
//     price: 'Rs 3,800',
//     image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
//     size: 'Large',
//     sellAs: 'Physical',
//     description: 'A breathtaking landscape capturing the vibrant hues of a sunset valley.'
//   },
//   {
//     id: 3,
//     title: 'Urban Lines',
//     category: 'Photography',
//     tags: ['Minimalist', 'Urban'],
//     price: 'Rs 1,800',
//     image: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231',
//     size: 'Small',
//     sellAs: 'Digital',
//     description: 'Minimalist photography focusing on clean urban lines and structures.'
//   },
// ];

// const ArtworkDetails: React.FC = () => {
//   const { id } = useParams<{ id: string }>(); // Read id from URL
//   const artwork = artworks.find((a) => a.id === Number(id)); // Find artwork

//   if (!artwork) {
//     return <div className="text-center py-20 text-xl text-gray-600">Artwork not found!</div>;
//   }

//   return (
//     <div className="min-h-screen bg-white flex justify-center py-10 px-4">
//       <div className="max-w-3xl w-full">
//         {/* Artwork Image */}
//         <img
//           src={artwork.image}
//           alt={artwork.title}
//           className="w-full max-h-[400px] object-cover rounded-xl shadow-md"
//         />

//         {/* Title and Price */}
//         <div className="flex justify-between items-center mt-6">
//           <h1 className="text-3xl font-bold text-[#421983]">{artwork.title}</h1>
//           <span className="text-2xl font-semibold text-[#F35E21]">{artwork.price}</span>
//         </div>

//         {/* Category Tags */}
//         <div className="flex flex-wrap gap-2 mt-4">
//           <span className="bg-[#f3f0fa] text-[#421983] text-sm px-3 py-1 rounded-full">
//             {artwork.category}
//           </span>
//           {artwork.tags.map((tag) => (
//             <span key={tag} className="bg-[#f3f0fa] text-[#421983] text-sm px-3 py-1 rounded-full">
//               {tag}
//             </span>
//           ))}
//         </div>

//         {/* Size and SellAs */}
//         <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6">
//           <div>
//             <p className="text-gray-600 text-sm">Size</p>
//             <p className="text-md font-medium">{artwork.size}</p>
//           </div>
//           <div>
//             <p className="text-gray-600 text-sm">Available As</p>
//             <p className="text-md font-medium text-[#FFD700]">{artwork.sellAs}</p>
//           </div>
//         </div>

//         {/* About the Artwork */}
//         <div className="mt-8">
//           <h2 className="text-2xl font-bold text-[#421983] mb-3">About the Artwork</h2>
//           <p className="text-gray-700 leading-relaxed">{artwork.description}</p>
//         </div>

//         {/* Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4 mt-8">
//           <button className="bg-[#F35E21] hover:bg-[#d94d18] text-white font-semibold px-6 py-3 rounded-lg shadow-md transition">
//             Purchase Artwork
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ArtworkDetails;


// ArtworkDetails.tsx
import React from "react";
import { useLocation } from "react-router-dom";

const ArtworkDetails: React.FC = () => {
  const location = useLocation();
  const artwork = location.state?.artwork;

  if (!artwork) {
    return <div className="text-center py-20 text-xl text-gray-600">Artwork not found!</div>;
  }

  return (
    <div className="min-h-screen bg-white flex justify-center py-10 px-4">
      <div className="max-w-3xl w-full">
        {/* Artwork Image */}
        {artwork.images?.[0] && (
          <img
            src={`http://localhost:3000/artwork-uploads/${artwork.images[0]}`}
            alt={artwork.title}
            className="w-full max-h-[400px] object-cover rounded-xl shadow-md"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-image.jpg';
              console.error('Failed to load image:', e.currentTarget.src);
            }}
          />
        )}

        {/* Title and Price */}
        <div className="flex justify-between items-center mt-6">
          <h1 className="text-3xl font-bold text-[#421983]">{artwork.title}</h1>
          <span className="text-2xl font-semibold text-[#F35E21]">Rs {artwork.price}</span> {/* Added Rs */}
        </div>

        {/* Category Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="bg-[#f3f0fa] text-[#421983] text-sm px-3 py-1 rounded-full">
            {artwork.category}
          </span>
          {artwork.tags.map((tag: string) => (
            <span key={tag} className="bg-[#f3f0fa] text-[#421983] text-sm px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Size and SellAs */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6">
          <div>
            <p className="text-gray-600 text-sm">Size</p>
            <p className="text-md font-medium">{artwork.size}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Available As</p>
            <p className="text-md font-medium text-[#FFD700]">{artwork.sellAs}</p>
          </div>
        </div>

        {/* About the Artwork */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-[#421983] mb-3">About the Artwork</h2>
          <p className="text-gray-700 leading-relaxed">{artwork.description}</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button className="bg-[#F35E21] hover:bg-[#d94d18] text-white font-semibold px-6 py-3 rounded-lg shadow-md transition">
            Purchase Artwork
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetails;
