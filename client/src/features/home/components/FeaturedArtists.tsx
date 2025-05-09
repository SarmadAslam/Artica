
import ArtistCard from './ArtistCard';
import { Artist } from '../../../types/types';

const featuredArtists: Artist[] = [
  { name: 'Sarah Chen', specialty: 'Digital Art', rating: 4.9 },
  { name: 'Marcus Rivera', specialty: 'Oil Painting', rating: 4.8 },
  { name: 'Emma Thompson', specialty: 'Watercolor', rating: 4.9 },
];

const FeaturedArtists: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Featured Artists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArtists.map((artist) => (
            <ArtistCard key={artist.name} artist={artist} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedArtists;