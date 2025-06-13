import React, { use } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const VolunteerNeed = ({ VolunteerNeedPromise }) => {
    const volunteerPosts = use(VolunteerNeedPromise);
    const { theme } = use(AuthContext);

    const isDark = theme === "dark";

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className={`text-3xl font-bold mb-10 text-center ${isDark ? "text-white" : "text-black"}`}>
                Volunteer Needs Now
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {volunteerPosts.map((post, index) => (
                    <div
                        key={index}
                        className={`rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-5 group border 
                            ${isDark ? "bg-gray-800 text-gray-200 border-gray-700" : "bg-white text-gray-800 border-gray-200"}`}
                    >
                        <div className="relative overflow-hidden rounded-xl mb-4">
                            <img
                                src={post.thumbnail}
                                alt={post.title}
                                className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        <h3 className={`text-xl font-semibold group-hover:text-blue-600 transition-colors duration-300 
                            ${isDark ? "text-white" : "text-gray-800"}`}>
                            {post.title}
                        </h3>

                        <div className={`mt-3 space-y-1 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                            <p>
                                <span className={`font-medium ${isDark ? "text-gray-100" : "text-gray-700"}`}>📁 Category:</span> {post.category}
                            </p>
                            <p>
                                <span className={`font-medium ${isDark ? "text-gray-100" : "text-gray-700"}`}>⏰ Deadline:</span> {post.deadline}
                            </p>
                        </div>

                        <div className="mt-6">
                            <Link to={`/detials/${post._id}`}>
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300">
                                    View Details
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* See All Button */}
            <div className="mt-12 text-center">
                <Link to="/all-posts">
                    <button className={`px-6 py-2 rounded-md transition font-medium 
    ${theme === "dark"
                            ? "bg-gray-800 text-white hover:bg-gray-900"
                            : "bg-white text-gray-900 hover:bg-gray-200"
                        }`}>
                        See All
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default VolunteerNeed;
