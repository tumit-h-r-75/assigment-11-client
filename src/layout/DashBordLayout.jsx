import React, { useState } from "react";
import {
  FaBars,
  FaPlusCircle,
  FaTasks,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { Link, NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import Logo from "../components/CustomLogo/Logo";
import { Outlet } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

const sidebarVariants = {
  open: {
    width: "16rem", // 64 in tailwind
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
  closed: {
    width: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();

  const menuItems = [
    { name: "My Profile", icon: <FaUserCircle />, path: "/dashBord/my-profile" },
    { name: "Add Post", icon: <FaPlusCircle />, path: "/dashBord/add-post" },
    { name: "Manage Posts", icon: <FaTasks />, path: "/dashBord/manage-posts" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AnimatePresence>
        {(isOpen || window.innerWidth >= 768) && (
          <motion.aside
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="bg-white shadow-md fixed md:static z-50 top-0 left-0 h-full overflow-hidden"
          >
            <div className="p-4 font-bold text-lg border-b flex items-center justify-between">
              <Link to="/dashBord">
                <span>Dashboard</span>
              </Link>
              <button
                className="md:hidden text-gray-500 hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                ✖
              </button>
            </div>

            {/* Menu */}
            <nav className="mt-4 min-h-screen">
              {menuItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 transition
                    ${
                      isActive
                        ? "bg-indigo-100 text-indigo-600 font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon} {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Logout */}
            <div>
              <button
                onClick={logOut}
                className="flex items-center gap-3 w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Content area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow px-4 py-3 sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-xl text-gray-600"
              aria-label="Toggle menu"
            >
              <FaBars />
            </button>
            <Logo />
          </div>
          <div className="flex items-center gap-3">
            {user && (
              <>
                <span className="hidden sm:inline">
                  Hi, <span className="font-semibold">{user?.displayName}</span>
                </span>
                <img
                  src={user?.photoURL}
                  alt="User"
                  className="w-10 h-10 rounded-full border object-cover"
                />
              </>
            )}
          </div>
        </header>
        {/* Main content */}
        <section className="mt-10 px-4 md:px-8">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default DashboardLayout;
