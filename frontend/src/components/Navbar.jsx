import React, { useState } from "react";
import { FaBars, FaChartBar, FaHome, FaPlus, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path
      ? "text-primary font-bold"
      : "text-gray-700 hover:text-primary";
  };

  return (
    <nav className="bg-white shadow-md relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-primary">
            Job Tracker
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-6">
            <li>
              <Link to="/" className={`flex items-center ${isActive("/")}`}>
                <FaHome className="mr-1" />
                <span>Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                to="/add-job"
                className={`flex items-center ${isActive("/add-job")}`}
              >
                <FaPlus className="mr-1" />
                <span>Add Job</span>
              </Link>
            </li>
            <li>
              <Link
                to="/statistics"
                className={`flex items-center ${isActive("/statistics")}`}
              >
                <FaChartBar className="mr-1" />
                <span>Statistics</span>
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-primary focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              <Link
                to="/"
                className={`block px-3 py-2 rounded-md ${isActive("/")}`}
                onClick={toggleMenu}
              >
                <div className="flex items-center">
                  <FaHome className="mr-2" />
                  <span>Dashboard</span>
                </div>
              </Link>
              <Link
                to="/add-job"
                className={`block px-3 py-2 rounded-md ${isActive("/add-job")}`}
                onClick={toggleMenu}
              >
                <div className="flex items-center">
                  <FaPlus className="mr-2" />
                  <span>Add Job</span>
                </div>
              </Link>
              <Link
                to="/statistics"
                className={`block px-3 py-2 rounded-md ${isActive(
                  "/statistics"
                )}`}
                onClick={toggleMenu}
              >
                <div className="flex items-center">
                  <FaChartBar className="mr-2" />
                  <span>Statistics</span>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
