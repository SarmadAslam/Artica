// Header.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from "../../../assets/images/rungley-logo.png"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 bg-background transition-border duration-200 ${isScrolled ? '' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-gray-800">
          <img src={logo} alt="Company Logo" className="h-8" /> RungLey
        </Link>
      </div>
    </header>
  );
};

export default Header;