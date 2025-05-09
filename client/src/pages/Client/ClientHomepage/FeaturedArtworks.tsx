// 'use client';
// import React from 'react';
// import ArtworkCard from './ArtworkCard';
// // import Image1 from '@/assets/image1.jpeg';
// import Image2 from '@/assets/image2.jpeg';
// import Image3 from '@/assets/image3.jpeg';
// import Image4 from '@/assets/image4.jpeg';

// const artworks = [
//   {
//     title: 'Abstract Harmony',
//     artist: 'Sarah Chen',
//     price: 'Current Bid: $2,400',
//     imageUrl: Image4,
//   },
//   {
//     title: 'Urban Reflection',
//     artist: 'Michael Torres',
//     price: 'Current Bid: $3,800',
//     imageUrl: Image2,
//   },
//   {
//     title: 'Digital Dreams',
//     artist: 'Alex Rivera',
//     price: 'Current Bid: $1,900',
//     imageUrl: Image3,
//   },
// ];

// const FeaturedArtworks = () => {
//   return (
//     <section className="px-10 py-16">
//       <div className="flex justify-between items-center mb-8">
//         <h2 className="text-2xl font-bold">Featured Artworks for Bidding</h2>
//         <a href="#" className="text-[#F35E21] font-semibold">View All</a>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {artworks.map((artwork, index) => (
//           <ArtworkCard
//             key={index}
//             title={artwork.title}
//             artist={artwork.artist}
//             price={artwork.price}
//             imageUrl={artwork.imageUrl}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default FeaturedArtworks;

'use client';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import ArtworkCard from './ArtworkCard'; // Make sure this matches the component structure
import endpoints from '../../../constraints/apiConfig';
import imagePath from '../../../constraints/imagepath';
import Loader from '@/components/loader/Loader';

type Artwork = {
  _id: string;
  title: string;
  category: string;
  currentBid?: number;
  startingBid?: number;
  expiresAt?: string;
  images?: string[];
};

const FeaturedArtworks: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const calculateTimeLeft = useCallback((expiresAt: string | undefined) => {
    if (!expiresAt) return { days: 0, hours: 0 };

    const difference = new Date(expiresAt).getTime() - new Date().getTime();
    if (difference <= 0) return { days: 0, hours: 0 };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    };
  }, []);

  const formatTimeLeft = useCallback((timeLeft: { days: number; hours: number }) => {
    if (!timeLeft) return "Ended";
    if (timeLeft.days > 0) return `${timeLeft.days}d ${timeLeft.hours}h`;
    if (timeLeft.hours > 0) return `${timeLeft.hours}h`;
    return "Ended";
  }, []);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(endpoints.getAllArtsWork);

        if (response.data.success) {
          const artworksWithTime = response.data.data.map((art: Artwork) => {
            const timeLeft = calculateTimeLeft(art.expiresAt);
            return {
              ...art,
              currentBid: art.currentBid || art.startingBid || 0,
              timeLeft,
            };
          });

          setArtworks(artworksWithTime);
        } else {
          setError('Failed to fetch artworks');
        }
      } catch (err) {
        setError('An error occurred while fetching artworks');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [calculateTimeLeft]);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 text-center py-6">{error}</div>;

  return (
    <section className="px-10 py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Featured Artworks for Bidding</h2>
        <a href="#" className="text-[#F35E21] font-semibold">View All</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {artworks.slice(0, 3).map((artwork) => (
    <ArtworkCard
      key={artwork._id}
      title={artwork.title || 'Untitled'}
      artist={artwork.category || 'Unknown Category'}
      price={`$${(artwork.currentBid || 0).toLocaleString()}`}
      imageUrl={artwork.images?.[0] ? `${imagePath}${artwork.images[0]}` : ''}
      timeLeft={formatTimeLeft(artwork.timeLeft)}
    />
  ))}
</div>

    </section>
  );
};

export default FeaturedArtworks;
