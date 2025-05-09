import React from "react";
import HeroSection from "./HeroSection";
import OurFeatures from "./OurFeatures"
import Navbar from "../../globalComponents/Navbar";
import ArtStories from "./ArtStories";
import Footer from "../../globalComponents/Footer";
import ArtistCards from "../../ArtistCards";
const Home = () => {
  return (
    <>
      <div className="">
        <Navbar/>
        <HeroSection/>
        <OurFeatures/>
        <ArtStories/>
        <ArtistCards/>
        <Footer/>
      </div>
    </>
  );
};
export default Home;
