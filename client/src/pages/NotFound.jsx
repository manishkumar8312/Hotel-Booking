import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 gap-6">
      <div className="text-8xl font-extrabold text-gray-300 select-none">404</div>
      <h1 className="text-3xl md:text-4xl font-semibold">Page not found</h1>
      <p className="text-gray-500 max-w-xl">
        The page you’re looking for doesn’t exist or was moved. Check the URL or go back to a safe place.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link to="/" className="px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600 transition">
          Go to Home
        </Link>
        <Link to="/rooms" className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition">
          Browse Rooms
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
