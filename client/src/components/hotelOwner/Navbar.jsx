import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { UserButton } from "@clerk/clerk-react";
import { useTheme } from "../../contexts/ThemeContext";

const OwnerNavbar = (props) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center justify-between py-3 px-4 md:px-8 border-b border-gray-300 bg-white transition-all duration-300">
        <Link to="/">
        <img src={assets.logo} alt="logo" className='h-9 invert opacity-80'/>
        </Link>
        <UserButton/>
        <nav>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>
        </nav>
    </div>
  );
};

export default OwnerNavbar