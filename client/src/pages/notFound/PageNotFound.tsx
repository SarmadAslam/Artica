import React from 'react';
import { Button } from '@/components/ui/button'; 

const PageNotFound: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">Page Not Found</h1>
        <p className="mt-4 text-lg text-gray-600">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button className="mt-6">
          <a href="/" className="text-white no-underline">Home Page</a>
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;