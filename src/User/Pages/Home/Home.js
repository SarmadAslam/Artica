import React from "react";
import NavBar from "../../Components/NavBar";
import TopBar from "../../Components/TopBar";
import Footer from "../../Components/Footer";

// Sections Import
import { HomeSection } from "../Section/section";
import CTA from './CTA'
import HowItWorks from './HowItWorks'
import JobsCategories from './JobCategories'
import Blog from './Blog'
import JobList from "./JobList/jobList";

import Testimonal from './Testimonal'

const Home = () => {
    return (
        <>
            <TopBar />
            <NavBar />
            <HomeSection />
            <JobsCategories />
            <JobList />
            <CTA />
            <HowItWorks />
            <Testimonal />
            <Blog />
            <Footer />
        </>
    )
}

export default Home;