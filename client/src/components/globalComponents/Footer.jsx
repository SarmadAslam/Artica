import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#421983] text-white py-10 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo and Tagline */}
        <div>
          <h2 className="text-2xl font-bold text-[#ffd700]">Rungley</h2>
          <p className="mt-2 text-gray-400">
            Explore, create, and buy amazing art and articles by real artists.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#ffd700]">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            {/* <li><Link to="/all-art-stories" className="hover:text-white">Artworks</Link></li> */}
            <li><Link to="/AllArts" className="hover:text-white">ALL Arts</Link></li>
            <li><Link to="/all-art-stories" className="hover:text-white">All Articles</Link></li>
            {/* <li><Link to="/create-article" className="hover:text-white">Create Article</Link></li> */}
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#ffd700]">Follow Us</h3>
          <div className="flex space-x-4">
            {/* Twitter */}
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#1DA1F2]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4.36a9.18 9.18 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.51 2.03-4.51 4.52 0 .35.04.7.1 1.03-3.75-.2-7.07-1.98-9.29-4.7a4.44 4.44 0 0 0-.61 2.28 4.52 4.52 0 0 0 2.01 3.76 4.48 4.48 0 0 1-2.04-.57v.05c0 2.2 1.57 4.03 3.65 4.45a4.52 4.52 0 0 1-2.02.08 4.51 4.51 0 0 0 4.21 3.14A9.06 9.06 0 0 1 0 19.54a12.76 12.76 0 0 0 6.92 2.03c8.3 0 12.85-6.88 12.85-12.85 0-.2-.01-.4-.02-.59A9.22 9.22 0 0 0 23 3z" />
              </svg>
            </a>

            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5C20.55 2 22 3.45 22 7.75v8.5c0 4.3-1.45 5.75-5.75 5.75h-8.5C3.45 22 2 20.55 2 16.25v-8.5C2 3.45 3.45 2 7.75 2zm0 2C4.9 4 4 4.9 4 7.75v8.5C4 19.1 4.9 20 7.75 20h8.5c2.85 0 3.75-.9 3.75-3.75v-8.5C20 4.9 19.1 4 16.25 4h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 .001 6.001A3 3 0 0 0 12 9zm4.5-3.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#ffd700]">Contact</h3>
          <p className="text-gray-300">Email: contact@rungley.com</p>
          <p className="text-gray-300">Phone: +92 300 1234567</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-10 text-gray-500 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} Rungley. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
