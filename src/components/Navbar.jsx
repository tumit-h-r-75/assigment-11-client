import React, { useState, use } from "react";
import { NavLink } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import navLogo from "../assets/download-removebg-preview.png";
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
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost m-1">My Profile</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-56">
                        <li><NavLink to="/add-post">Add Volunteer Need Post</NavLink></li>
                        <li><NavLink to="/manage-posts">Manage My Posts</NavLink></li>
                    </ul>
                </div>
            )}
        </>
    );

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <img src={navLogo} alt="Logo" className="w-44 h-20" />
                </div>

                {/* Desktop Menu */}
                <ul className="hidden lg:flex gap-8 text-base font-medium text-gray-700 items-center">
                    {navLinks}
                </ul>

                {/* Right side - Auth Buttons */}
                <div className="hidden lg:flex items-center space-x-4 text-sm">
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
                                className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-lg flex justify-center items-center gap-1 hover:bg-blue-700 transition"
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
                <div className="lg:hidden px-4 pb-4 border-t border-gray-200 bg-white">
                    <ul className="space-y-3 text-base font-medium text-gray-700">
                        {navLinks}

                        {user && (
                            <>
                                <li className="border-t pt-3">
                                    <span className="block font-medium text-gray-800 mb-2">
                                        My Profile
                                    </span>
                                    <ul className="pl-4 space-y-1">
                                        <li>
                                            <NavLink to="/add-post" className="block hover:text-blue-600">
                                                Add Volunteer Need Post
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/manage-posts" className="block hover:text-blue-600">
                                                Manage My Posts
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogOut}
                                        className="w-full text-left bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 mt-4"
                                    >
                                        Logout <IoIosLogOut />
                                    </button>
                                </li>
                            </>
                        )}

                        {!user && (
                            <>
                                <li>
                                    <NavLink
                                        to="/login"
                                        className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition"
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
