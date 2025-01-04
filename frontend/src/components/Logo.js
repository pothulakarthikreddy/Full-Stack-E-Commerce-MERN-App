import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div className="flex items-center">
      <Link to="/">
        {/* Display the logo image */}
        {/* <img
          src="/path-to-your-logo.png" // Replace with your logo path
          alt="Shop KBuy Logo"
          className="h-10 md:h-14 w-auto object-contain" // Responsive height
        /> */}
        <span className="text-base sm:text-lg md:text-xl font-medium text-gray-950 ml-2 block">
         KBuy
      </span>
      </Link>

      {/* Optional: Add a text version of the logo for smaller screens */}
      
    </div>
  );
};

export default Logo;
