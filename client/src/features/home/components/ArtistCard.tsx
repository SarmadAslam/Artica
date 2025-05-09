import React from 'react';
import { Card, CardContent } from "../../../components/ui/card";
import { Artist } from '../../../types/types';

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  return (
    <Card className="card-hover">
      <CardContent className="pt-6">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200" />
        <h3 className="font-semibold text-lg text-center">{artist.name}</h3>
        <p className="text-gray-600 text-center">{artist.specialty}</p>
        <p className="text-[#F35E21] text-center mt-2">★ {artist.rating}</p>
      </CardContent>
    </Card>
  );
};

export default ArtistCard;