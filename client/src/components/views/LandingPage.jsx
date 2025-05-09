
import { Outlet } from "react-router-dom";
import Footer from "../globalComponents/Footer";
import Navbar from "../globalComponents/Navbar";
import MainLayout from "@/layouts/MainLayout";

const LandingPage = () => {
  return (

<MainLayout>

<div className="">
        <Outlet />
      </div>
      {/* <Footer /> */}

</MainLayout>
      
  );
};

export default LandingPage;
