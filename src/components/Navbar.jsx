import React, { useState, use } from "react";
import { Link, NavLink } from "react-router";
import { FaBars, FaTimes, FaHome, FaListUl, FaUserPlus, FaSignInAlt, FaUserCircle, FaInfoCircle } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import navLogo from "../assets/logo-1.avif";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOutUser, theme, setTheme } = use(AuthContext);

  const handleToggle = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold border-b-2 border-blue-600"
      : `hover:text-blue-600 transition duration-300 ${theme === "light" ? "text-black" : "text-white"}`;

  const handleLogOut = () => {
    signOutUser()
      .then(() => setMenuOpen(false))
      .catch((error) => toast.error(error.message));
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={linkClass}>
          <FaHome className="inline mr-1" /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-posts" className={linkClass}>
          <FaListUl className="inline mr-1" /> All Volunteer Posts
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={linkClass}>
          <FaInfoCircle className="inline mr-1" /> About
        </NavLink>
      </li>

      {user && (
        <li className="dropdown group cursor-pointer">
          <NavLink tabIndex={0} className={`${theme === "light" ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-400"}`}>
            <FaUserCircle className="inline mr-1" /> My Profile
          </NavLink>
          <ul
            tabIndex={0}
            className={`dropdown-content menu top-6 left-0 hidden group-hover:block ${theme === "light" ? "bg-white" : "bg-gray-800"
              } shadow-md rounded-md w-56 z-50`}
          >
            <li>
              <NavLink to="/add-post" className={`block px-4 py-2 ${theme === "light" ? "hover:bg-gray-100 text-black" : "hover:bg-gray-700 text-white"}`}>
                ➕ Add Post
              </NavLink>
            </li>
            <li>
              <NavLink to="/manage-posts" className={`block px-4 py-2 ${theme === "light" ? "hover:bg-gray-100 text-black" : "hover:bg-gray-700 text-white"}`}>
                ⚙️ Manage Posts
              </NavLink>
            </li>
          </ul>
        </li>
      )}
    </>
  );

  return (
    <header className={`shadow-md w-full mx-auto ${theme === "light" ? "bg-gray-200 text-black" : "bg-gray-700 text-white"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <Link to='/' className="flex items-center gap-3">
          <img src={navLogo} alt="Logo" className="w-28 md:w-36 h-20 rounded-full" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-8 text-base font-medium items-center">{navLinks}</ul>

        {/* Toggle Button */}
        <div className="hidden md:flex items-center gap-2">
          <label className="toggle text-base-content cursor-pointer">
            <input onChange={handleToggle} type="checkbox" checked={theme === "dark"} className="hidden" />
            {/* Sun */}
            <svg
              aria-label="sun"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`w-6 h-6 ${theme === "dark" ? "hidden" : "block"}`}
            >
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
              </g>
            </svg>
            {/* Moon */}
            <svg
              aria-label="moon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`w-6 h-6 ${theme === "dark" ? "block" : "hidden"}`}
            >
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                <path d="M12 3a6 6 0 009 9 9 9 0 11-9-9z"></path>
              </g>
            </svg>
          </label>
        </div>

        {/* Desktop Auth */}
        <div className="hidden lg:flex items-center gap-4 text-sm">
          {user ? (
            <>
              <div className="relative group cursor-pointer">
                <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full ring-2 ring-blue-500 object-cover" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 bg-blue-600 text-white text-xs rounded px-2 py-1 transition-opacity duration-300">
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
              <NavLink to="/register" className={`underline hover:text-blue-600 ${theme === "light" ? "text-black" : "text-white"}`}>
                <FaUserPlus className="inline mr-1" /> Register
              </NavLink>
              <NavLink to="/login" className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition">
                <FaSignInAlt className="inline mr-1" /> Login
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl" aria-label="Toggle menu">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className={`lg:hidden px-4 pb-4 pt-2 border-t ${theme === "light" ? "bg-white text-black border-gray-200" : "bg-gray-800 text-white border-gray-600"}`}>
          <ul className="space-y-3 text-base font-medium">{navLinks}</ul>

          {/* Toggle for Mobile */}
          <div className="flex items-center mt-4">
            <label className="toggle text-base-content cursor-pointer">
              <input onChange={handleToggle} type="checkbox" checked={theme === "dark"} className="hidden" />
              {/* Same Icons */}
              <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`w-6 h-6 ${theme === "dark" ? "hidden" : "block"}`}>
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
                </g>
              </svg>
              <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`w-6 h-6 ${theme === "dark" ? "block" : "hidden"}`}>
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                  <path d="M12 3a6 6 0 009 9 9 9 0 11-9-9z"></path>
                </g>
              </svg>
            </label>
          </div>

          {/* Mobile Auth */}
          {user ? (
            <>
              <div className="flex items-center gap-3 mt-4">
                <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full ring-2 ring-blue-500 object-cover" />
                <span>{user.displayName}</span>
              </div>
              <button onClick={handleLogOut} className="w-full bg-blue-600 text-white mt-3 px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Logout
              </button>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/register" className={`block text-center hover:text-blue-600 ${theme === "light" ? "text-black" : "text-white"}`}>
                  <FaUserPlus className="inline mr-1" /> Register
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className="block bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition">
                  <FaSignInAlt className="inline mr-1" /> Login
                </NavLink>
              </li>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
