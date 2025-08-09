import React, { useEffect, useState } from "react";

const MyProfile = () => {
  const [user, setUser] = useState(null);

  // Example: Fetch user data from API
  useEffect(() => {
    // এখানে তোমার API URL বসাও
    fetch("https://api.example.com/me")
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error(err));
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            src={user.avatar || "https://via.placeholder.com/150"}
            alt={user.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
          <p className="mt-2 text-sm text-indigo-600 font-medium">
            Role: {user.role || "Member"}
          </p>

          {/* Bio */}
          {user.bio && (
            <p className="mt-4 text-gray-700 leading-relaxed">{user.bio}</p>
          )}

          {/* Actions */}
          <div className="mt-4 flex justify-center md:justify-start gap-3">
            <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition">
              Edit Profile
            </button>
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Extra Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold">Posts</h3>
          <p className="text-2xl font-bold text-indigo-500">{user.postsCount || 0}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold">Followers</h3>
          <p className="text-2xl font-bold text-indigo-500">{user.followers || 0}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold">Following</h3>
          <p className="text-2xl font-bold text-indigo-500">{user.following || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
