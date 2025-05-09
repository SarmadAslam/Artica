

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Add this

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

// const ViewExhibitionItems: React.FC = () => {
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedTag, setSelectedTag] = useState('All');
//   const navigate = useNavigate(); // Add this

//   const categories = ['All', 'Digital', 'Traditional', 'Photography'];
//   const tags = ['All', 'Abstract', 'Nature', 'Landscape', 'Minimalist', 'Urban'];

//   const filteredArtworks = artworks.filter((art) => {
//     const categoryMatch = selectedCategory === 'All' || art.category === selectedCategory;
//     const tagMatch = selectedTag === 'All' || art.tags.includes(selectedTag);
//     return categoryMatch && tagMatch;
//   });

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       {/* Heading */}
//       <div className="text-center mb-8">
//         <h1 className="text-4xl font-bold text-[#421983]">Spring Art Exhibition 2025</h1>
//         <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
//           Discover extraordinary artworks from talented artists around the world.
//           This exhibition features a diverse collection of contemporary pieces.
//         </p>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-wrap gap-4 justify-center mb-10">
//         <select
//           className="border rounded-md p-2 text-gray-700"
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//         >
//           {categories.map((cat) => (
//             <option key={cat} value={cat}>{cat}</option>
//           ))}
//         </select>

//         <select
//           className="border rounded-md p-2 text-gray-700"
//           value={selectedTag}
//           onChange={(e) => setSelectedTag(e.target.value)}
//         >
//           {tags.map((tag) => (
//             <option key={tag} value={tag}>{tag}</option>
//           ))}
//         </select>

//         <button
//           className="bg-[#421983] hover:bg-[#2e105a] text-white px-4 py-2 rounded-md"
//           onClick={() => {
//             setSelectedCategory('All');
//             setSelectedTag('All');
//           }}
//         >
//           Reset Filters
//         </button>
//       </div>

//       {/* Artworks */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {filteredArtworks.map((art) => (
//           <div key={art.id} className="bg-white rounded-lg overflow-hidden shadow-md relative group">
//             <img src={art.image} alt={art.title} className="h-60 w-full object-cover" />
//             <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm hover:bg-gray-100">
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#421983" className="w-5 h-5">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//               </svg>
//             </button>

//             <div className="p-4">
//               <h2 className="font-semibold text-lg text-gray-800">{art.title}</h2>
//               <p className="text-sm text-gray-500 mb-4">{art.category} • {art.tags.join(', ')}</p>

//               <div className="flex justify-between items-center">
//                 <span className="font-bold text-[#421983]">{art.price}</span>
//                 <button
//                   className="bg-[#F35E21] hover:bg-orange-600 text-white px-4 py-2 text-sm rounded-md"
//                   onClick={() => navigate(`/artwork/${art.id}`)} // Navigate with id
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ViewExhibitionItems;
// ViewExhibitionItems.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const artworks = [
  {
    id: 1,
    title: 'Geometric Dreams',
    category: 'Digital',
    tags: ['Abstract'],
    price: 'Rs 2,500',
    image: 'https://images.unsplash.com/photo-1581091870627-3a9f9441d2e8',
    size: 'Medium',
    sellAs: 'Digital',
    description: 'An abstract exploration of geometric forms in a dream-like sequence.'
  },
  {
    id: 2,
    title: 'Sunset Valley',
    category: 'Traditional',
    tags: ['Landscape', 'Nature'],
    price: 'Rs 3,800',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    size: 'Large',
    sellAs: 'Physical',
    description: 'A breathtaking landscape capturing the vibrant hues of a sunset valley.'
  },
  {
    id: 3,
    title: 'Urban Lines',
    category: 'Photography',
    tags: ['Minimalist', 'Urban'],
    price: 'Rs 1,800',
    image: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231',
    size: 'Small',
    sellAs: 'Digital',
    description: 'Minimalist photography focusing on clean urban lines and structures.'
  },
];

const ViewExhibitionItems: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');
  const navigate = useNavigate();

  const categories = ['All', 'Digital', 'Traditional', 'Photography'];
  const tags = ['All', 'Abstract', 'Nature', 'Landscape', 'Minimalist', 'Urban'];

  const filteredArtworks = artworks.filter((art) => {
    const categoryMatch = selectedCategory === 'All' || art.category === selectedCategory;
    const tagMatch = selectedTag === 'All' || art.tags.includes(selectedTag);
    return categoryMatch && tagMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#421983]">Spring Art Exhibition 2025</h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Discover extraordinary artworks from talented artists around the world.
          This exhibition features a diverse collection of contemporary pieces.
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

      {/* Artworks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredArtworks.map((art) => (
          <div key={art.id} className="bg-white rounded-lg overflow-hidden shadow-md relative group">
            <img src={art.image} alt={art.title} className="h-60 w-full object-cover" />
            <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#421983" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            <div className="p-4">
              <h2 className="font-semibold text-lg text-gray-800">{art.title}</h2>
              <p className="text-sm text-gray-500 mb-4">{art.category} • {art.tags.join(', ')}</p>

              <div className="flex justify-between items-center">
                <span className="font-bold text-[#421983]">{art.price}</span>
                <button
                  className="bg-[#F35E21] hover:bg-orange-600 text-white px-4 py-2 text-sm rounded-md"
                  onClick={() => navigate(`/artwork/${art.id}`, { state: { artwork: art } })}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewExhibitionItems;
