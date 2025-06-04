import React, { useState } from "react";
import { NavLink } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import navLogo from "../assets/download-removebg-preview.png";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const linkClass = ({ isActive }) =>
        isActive
            ? "text-blue-600 font-semibold border-b-2 border-blue-600"
            : "hover:text-blue-600 transition duration-300";

    const navLinks = (
        <>
            <li>
                <NavLink to="/" className={linkClass}>
                    Home
                </NavLink>
            </li>

            <li>
                <NavLink to="/all-posts" className={linkClass}>
                    All Volunteer Need Posts
                </NavLink>
            </li>

            {/* Profile Dropdown for Desktop */}
            <li className="relative group hidden lg:block">
                <span className="px-4 py-2 inline-block cursor-pointer hover:text-blue-600 font-medium">
                    My Profile
                </span>
                <ul className="absolute hidden group-hover:block bg-white border rounded-md shadow-md w-56 z-50 mt-2">
                    <li>
                        <NavLink to="/add-post" className="block px-4 py-2 hover:bg-gray-100 transition">
                            Add Volunteer Need Post
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/manage-posts" className="block px-4 py-2 hover:bg-gray-100 transition">
                            Manage My Posts
                        </NavLink>
                    </li>
                </ul>
            </li>
        </>
    );

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <img src={navLogo} alt="Logo" className="w-44 h-20" />
                </div>

                {/* Desktop Navigation */}
                <ul className="hidden lg:flex gap-8 text-base font-medium text-gray-700 items-center">
                    {navLinks}
                </ul>

                {/* Desktop Auth Buttons */}
                <div className="hidden lg:flex items-center gap-4 text-sm">
                    <NavLink
                        to="/register"
                        className="underline text-gray-800 hover:text-blue-600"
                    >
                        Register
                    </NavLink>
                    <NavLink
                        to="/login"
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
                    >
                        Sign in
                    </NavLink>
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

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="lg:hidden px-4 pb-4 border-t border-gray-200 bg-white">
                    <ul className="space-y-3 text-base font-medium text-gray-700">
                        {navLinks}

                        {/* My Profile Dropdown for Mobile */}
                        <li className="border-t pt-3">
                            <span className="block font-medium text-gray-800 mb-2">
                                My Profile
                            </span>
                            <ul className="pl-4 space-y-1">
                                <li>
                                    <NavLink to="/add-post" className="block hover:text-blue-600">
                                        ➤ Add Volunteer Need Post
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/manage-posts" className="block hover:text-blue-600">
                                        ➤ Manage My Posts
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                        {/* Logout Button */}
                        <li>
                            <button className="w-full text-left bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 mt-4">
                                Logout <IoIosLogOut />
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Navbar;
