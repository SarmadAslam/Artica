import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/navigation/Navbar";
import { Footer } from "../components/Footer";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header - Full width */}
      <header className="bg-white sticky top-0 z-50 w-full">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Navbar />
        </div>
      </header>

      {/* Main Content Area - Proper width constraints */}
      <main className="flex-1 bg-background">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>

      {/* Footer - Full width with inner container */}
      <footer className="w-full bg-white border-t border-gray-200">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Footer />
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;