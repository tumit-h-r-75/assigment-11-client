import React, { useState, use } from "react";
import { NavLink } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import navLogo from "../assets/logo-1.avif";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOutUser } = use(AuthContext);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold border-b-2 border-blue-600"
      : "hover:text-blue-600 transition duration-300";

  const handleLogOut = () => {
    signOutUser()
      .then(() => setMenuOpen(false))
      .catch((error) => toast.error(error.message));
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={linkClass}>Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-posts" className={linkClass}>
          All Volunteer Need Posts
        </NavLink>
      </li>
      {user && (
        <li className="relative group cursor-pointer">
          <div className="text-gray-700 hover:text-blue-600">My Profile</div>
          <ul className="absolute top-6 left-0 hidden group-hover:block bg-white shadow-md rounded-md w-56 z-50">
            <li>
              <NavLink to="/add-post" className="block px-4 py-2 hover:bg-gray-100">
                Add Volunteer Need Post
              </NavLink>
            </li>
            <li>
              <NavLink to="/manage-posts" className="block px-4 py-2 hover:bg-gray-100">
                Manage My Posts
              </NavLink>
            </li>
          </ul>
        </li>
      )}
    </>
  );

  return (
    <header className="bg-white shadow-md ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={navLogo} alt="Logo" className="w-36 md:w-44 h-22" />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-8 text-base font-medium text-gray-700 items-center">
          {navLinks}
        </ul>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center gap-4 text-sm">
          {user ? (
            <>
              <div className="relative group cursor-pointer">
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-10 h-10 rounded-full ring-2 ring-blue-500 object-cover"
                />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 bg-blue-600 text-white text-xs rounded px-2 py-1 whitespace-nowrap pointer-events-none transition-opacity duration-300">
                  {user.displayName}
                </div>
              </div>
              <button
                onClick={handleLogOut}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-lg flex items-center gap-1 hover:bg-blue-700 transition"
              >
                Logout <IoIosLogOut />
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/register"
                className="underline text-gray-800 hover:text-blue-600"
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition"
              >
                Login
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-gray-800"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="lg:hidden px-4 pb-4 pt-2 border-t border-gray-200 bg-white">
          <ul className="space-y-3 text-base font-medium text-gray-700">
            {navLinks}
            {user ? (
              <>
                <div className="flex items-center gap-3">
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full ring-2 ring-blue-500 object-cover"
                  />
                  <span className="text-gray-800 font-medium">{user.displayName}</span>
                </div>
                <button
                  onClick={handleLogOut}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/register"
                    className="block text-center text-gray-800 hover:text-blue-600"
                  >
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className="block bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
