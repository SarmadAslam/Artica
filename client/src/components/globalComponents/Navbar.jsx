import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Button from "./Button";
import logo from '../../assets/logo/rungley.svg';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const buttons = [
    { label: "Home", path: "/" },
    // { label: "Browse", path: "/browse" },
    // { label: "About", path: "/Dashboard/showProfile" },
    // { label: "Contact", path: "/contact" },
    // { label: "My Artworks", path: "/artworkForm" },
    { label: "All Arts", path: "/AllArts" },
    { label: "Bidding", path: "/Dashboard/bidding" },
    { label: "Bid History", path: "/BidHistory" },

    { label: "All Articles", path: "/all-art-stories" },
    { label: "Purchase Arts", path: "/Dashboard/purchase" },






    // { label: "Profile", path: "/ShowProfile" },
  ];

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);


  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <>
      <div className="hidden md:flex justify-center">
        <div className="flex w-[87%]  text-[#4B5563] bg-white justify-between items-center py-3 2xl:py-6">
          <img src={logo} alt="Logo" className="w-28"/>
          <div className="flex gap-6">
            {buttons.map((item, index) => (
              <button key={index}
                className={`cursor-pointer  2xl:text-lg font-medium p-1 rounded ${
                  location.pathname === item.path ? "text-primary" : "hover:text-primary"
                }`}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2 items-center">
  {!isAuthenticated ? (
    <>
      <Link to="/signin">
        <Button text="Sign In" variant="outline" className="cursor-pointer"/>
      </Link>
      <Link to="/signup">
        <Button text="Sign Up" variant="primary" className="cursor-pointer" />
      </Link>
    </>
  ) : (
    <Link to="/Dashboard">
      <Button text="Dashboard" variant="primary" className="cursor-pointer" />
    </Link>
  )}
</div>

        </div>
      </div>

      <div className="flex md:hidden justify-between items-center w-full bg-gradient-to-r from-[#] to-white px-4 py-3 shadow-md z-40">
        <button onClick={toggleSidebar} className="text-[#2D336B]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
        <img src={logo} alt="Logo" className="w-20"/>
      </div>

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        buttons={buttons}
        navigate={navigate}
      />
    </>
  );
};

export default Navbar;
