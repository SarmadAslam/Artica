

// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useGetAllArtworksQuery } from "@/api/participateInExhibitionApi";

// export default function ExhibitionArtworks() {
//   const { title } = useParams<{ title: string }>();
//   const { data: artworks, isLoading, error } = useGetAllArtworksQuery({});

//   useEffect(() => {
//     console.log("Received artworks data:", artworks);
//   }, [artworks]);

//   const filtered = artworks?.filter((art: any) => art.exhibitionTitle === title);

//   if (isLoading) return <p className="p-6 text-[#421983]">Loading artworks...</p>;
//   if (error) return <p className="p-6 text-red-600">Failed to load artworks.</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold text-[#F35E21] mb-6">Artworks for "{title}"</h2>
//       {filtered?.length === 0 ? (
//         <p>No artworks submitted for this exhibition yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filtered.map((artwork: any) => (
//             <div key={artwork._id} className="bg-white p-4 rounded-lg shadow-md">
//               {/* Image */}
//               {artwork.images?.[0] && (
//                 <img
//                   src={`http://localhost:3000/artwork-uploads/${artwork.images[0]}`}
//                   alt={artwork.title}
//                   className="w-full h-48 object-cover rounded-md mb-3"
//                   onError={(e) => {
//                     e.currentTarget.src = '/placeholder-image.jpg';
//                     console.error('Failed to load image:', e.currentTarget.src);
//                   }}
//                 />
//               )}

//               {/* Artwork Details */}
//               <h3 className="text-lg font-semibold">{artwork.title}</h3>
//               <p className="text-sm text-gray-600">{artwork.description}</p>

//               <div className="mt-2 text-sm text-gray-700">
//                 <p><strong>Category:</strong> {artwork.category}</p>
//                 <p><strong>Tags:</strong> {artwork.tags?.join(", ")}</p>
//                 <p><strong>Available for Sale:</strong> {artwork.availableForSale ? "Yes" : "No"}</p>
//                 <p><strong>Price:</strong> Rs{artwork.price}</p>
//                 <p><strong>Size:</strong> {artwork.size}</p>
//                 <p><strong>Sell As:</strong> {artwork.sellAs}</p>
//                 <p><strong>Exhibition:</strong> {artwork.exhibitionTitle}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetAllArtworksQuery } from '@/api/participateInExhibitionApi';

const ExhibitionArtworks: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const { data: artworks, isLoading, error } = useGetAllArtworksQuery({});
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Received artworks data:', artworks);
  }, [artworks]);

  const categories = ['All', 'Digital', 'Traditional', 'Photography'];
  const tags = ['All', 'Abstract', 'Nature', 'Landscape', 'Minimalist', 'Urban'];

  const filteredByTitle = artworks?.filter((art: any) => art.exhibitionTitle === title) || [];

  const filteredArtworks = filteredByTitle.filter((art: any) => {
    const categoryMatch = selectedCategory === 'All' || art.category === selectedCategory;
    const tagMatch = selectedTag === 'All' || (art.tags && art.tags.includes(selectedTag));
    return categoryMatch && tagMatch;
  });

  if (isLoading) return <p className="p-6 text-[#421983]">Loading artworks...</p>;
  if (error) return <p className="p-6 text-red-600">Failed to load artworks.</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#421983]">Artworks for "{title}"</h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Explore a curated selection of artworks submitted to this exhibition.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center mb-10">
        <select
          className="border rounded-md p-2 text-gray-700"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          className="border rounded-md p-2 text-gray-700"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          {tags.map((tag) => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>

        <button
          className="bg-[#421983] hover:bg-[#2e105a] text-white px-4 py-2 rounded-md"
          onClick={() => {
            setSelectedCategory('All');
            setSelectedTag('All');
          }}
        >
          Reset Filters
        </button>
      </div>

      {/* Artworks Grid */}
      {filteredArtworks.length === 0 ? (
        <p className="text-center text-gray-500">No artworks match the selected filters.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredArtworks.map((artwork: any) => (
            <div key={artwork._id} className="bg-white rounded-lg overflow-hidden shadow-md relative group">
              {artwork.images?.[0] && (
                <img
                  src={`http://localhost:3000/artwork-uploads/${artwork.images[0]}`}
                  alt={artwork.title}
                  className="h-60 w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-image.jpg';
                    console.error('Failed to load image:', e.currentTarget.src);
                  }}
                />
              )}
              <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#421983" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>

              <div className="p-4">
                <h2 className="font-semibold text-lg text-gray-800">{artwork.title}</h2>
                <p className="text-sm text-gray-500 mb-2">{artwork.category} • {artwork.tags?.join(', ')}</p>
                <p className="text-sm text-gray-600 mb-2">{artwork.description}</p>

                <div className="text-sm text-gray-700 space-y-1 mb-4">
                  <p><strong>Available for Sale:</strong> {artwork.availableForSale ? "Yes" : "No"}</p>
                  <p><strong>Price:</strong> Rs {artwork.price}</p>
                  <p><strong>Size:</strong> {artwork.size}</p>
                  <p><strong>Sell As:</strong> {artwork.sellAs}</p>
                </div>

                <div className="flex justify-end">
                  <button
                    className="bg-[#F35E21] hover:bg-orange-600 text-white px-4 py-2 text-sm rounded-md"
                    onClick={() => navigate(`/artwork/${artwork._id}`, { state: { artwork } })}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExhibitionArtworks;
