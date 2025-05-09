'use client';
import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection'
import InfoCards from './InfoCards';
import FeaturedArtworks from './FeaturedArtworks';
import UpcomingExhibitions from './UpcomingExhibitions';
import LatestArticles from './LatestArticles';

export default function ClientHomePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <HeroSection />
      <InfoCards />
      <FeaturedArtworks />
      <UpcomingExhibitions />
      <LatestArticles />
    </div>
  );
}
