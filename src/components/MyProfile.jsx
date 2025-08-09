import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import Loader from "./Loader";

const MyProfile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader></Loader>
      </div>
    );
  }

  const handleSave = async () => {
    try {
      await updateUser({
        displayName,
        photoURL
      });
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert("Error updating profile!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            src={user?.photoURL}
            alt={user?.displayName}
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center md:text-left">
          {!isEditing ? (
            <>
              <h1 className="text-2xl font-bold text-gray-800">
                {user.displayName || "Unnamed User"}
              </h1>
              <p className="text-gray-600">{user.email}</p>
            </>
          ) : (
            <div className="space-y-2">
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="border rounded-lg px-3 py-2 w-full"
                placeholder="Enter name"
              />
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="border rounded-lg px-3 py-2 w-full"
                placeholder="Enter photo URL"
              />
            </div>
          )}

          {/* Actions */}
          <div className="mt-4 flex justify-center md:justify-start gap-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-white shadow-md rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">About</h2>
        <p className="text-gray-600">
          This is your personal profile page. You can edit your details anytime.
          Keep your profile updated for a better personalized experience.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium text-gray-800">Joined On</h3>
          <p className="text-gray-600">{user.metadata?.creationTime || "N/A"}</p>
        </div>
        <div>
          <h3 className="font-medium text-gray-800">Last Login</h3>
          <p className="text-gray-600">{user.metadata?.lastSignInTime || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
