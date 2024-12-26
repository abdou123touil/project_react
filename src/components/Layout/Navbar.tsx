import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Home, MessageSquare, User, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              SocialApp
            </Link>
          </div>

          {/* Navigation Links and User Dropdown */}
          {user && (
            <div className="flex items-center space-x-4">
              {/* Navigation Links */}
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100"
              >
                <Home className="w-6 h-6" />
              </Link>
              <Link
                to="/messages"
                className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100"
              >
                <MessageSquare className="w-6 h-6" />
              </Link>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100"
                >
                  <span className="mr-2">{user.firstName}</span>
                  <ChevronDown className="w-5 h-5" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
