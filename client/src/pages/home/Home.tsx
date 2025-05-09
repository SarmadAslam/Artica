import ArtistCard from "@/features/home/components/ArtistCard";
import { Hero } from "../../features/home/components/Hero";
import MainLayout from "../../layouts/MainLayout";
import FeaturedArtists from "@/features/home/components/FeaturedArtists";
import CategoriesSection from "@/features/home/components/CategoriesSection";

const Home: React.FC = () => {
  return (
    <MainLayout>
      <Hero />
      <FeaturedArtists/>
      <CategoriesSection />
    </MainLayout>
  );
};

export default Home;