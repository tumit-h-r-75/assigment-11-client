import React, { useState } from "react";
import { FaBars, FaTachometerAlt, FaUsers, FaCog, FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "react-router";

const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/" },
    { name: "Users", icon: <FaUsers />, path: "/users" },
    { name: "Settings", icon: <FaCog />, path: "/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-md transition-all duration-300 fixed md:static z-50
        ${isOpen ? "w-64" : "w-0 md:w-64"} overflow-hidden`}
      >
        <div className="p-4 font-bold text-lg border-b">My Dashboard</div>
        <nav className="mt-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 hover:bg-gray-200 transition
                ${isActive ? "bg-gray-200 font-semibold" : ""}`
              }
            >
              {item.icon} {item.name}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full border-t">
          <button className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-200">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow px-4 py-3 sticky top-0 z-40">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-xl"
          >
            <FaBars />
          </button>
          <div className="font-bold text-lg">Dashboard</div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">Hi, User</span>
            <img
              src="https://via.placeholder.com/40"
              alt="User"
              className="w-10 h-10 rounded-full border"
            />
          </div>
        </header>

        {/* Main content */}
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
