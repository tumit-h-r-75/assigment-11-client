import React from "react";
import useAuth from "../hooks/useAuth";
import { FaClipboardList, FaUserFriends, FaBell } from "react-icons/fa";
import { Link } from "react-router";

const DashHome = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 flex flex-col md:flex-row items-center gap-6">
        <img
          src={user?.photoURL }
          alt={user?.displayName}
          className="w-24 h-24 rounded-full border-4 border-indigo-500 object-cover"
        />
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-semibold text-gray-800">
            Welcome back, {user?.displayName}!
          </h2>
          <p className="mt-2 text-gray-600">
            Here's what's happening with your dashboard today.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-indigo-50 p-6 rounded-xl shadow flex items-center gap-4">
          <FaClipboardList className="text-indigo-500 text-4xl" />
          <div>
            <h3 className="text-xl font-semibold text-indigo-700">Posts</h3>
            <p className="text-3xl font-bold text-indigo-900">24</p>
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-xl shadow flex items-center gap-4">
          <FaUserFriends className="text-green-500 text-4xl" />
          <div>
            <h3 className="text-xl font-semibold text-green-700">Followers</h3>
            <p className="text-3xl font-bold text-green-900">1.2K</p>
          </div>
        </div>

        <div className="bg-yellow-50 p-6 rounded-xl shadow flex items-center gap-4">
          <FaBell className="text-yellow-500 text-4xl" />
          <div>
            <h3 className="text-xl font-semibold text-yellow-700">Notifications</h3>
            <p className="text-3xl font-bold text-yellow-900">7</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-10 bg-white rounded-xl shadow-md p-6">
        <h3 className="text-2xl font-semibold mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Link to='/dashBord/add-post' className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow transition">
            Add New Post
          </Link>
          <Link  to='/dashBord/manage-posts' className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow transition">
            Manage Posts
          </Link>
          <Link to='/dashBord/my-profile' className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg shadow transition">
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashHome;
