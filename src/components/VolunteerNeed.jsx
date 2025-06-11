import React, { use } from 'react';
import { Link } from 'react-router';

const VolunteerNeed = ({ VolunteerNeedPromise }) => {
    const volunteerPosts = use(VolunteerNeedPromise);

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-8 text-center">Volunteer Needs Now</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {volunteerPosts.map((post, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 group"
                    >
                        <div className="relative">
                            <img
                                src={post.thumbnail}
                                alt={post.title}
                                className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                            {post.title}
                        </h3>

                        <div className="mt-2 space-y-1 text-sm text-gray-600">
                            <p>
                                <span className="font-medium text-gray-700">📁 Category:</span> {post.category}
                            </p>
                            <p>
                                <span className="font-medium text-gray-700">⏰ Deadline:</span> {post.deadline}
                            </p>
                        </div>

                        <div className="mt-5">
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
            <div className="mt-10 text-center">
                <Link to="/all-posts">
                    <button className="btn bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-md">See All</button>
                </Link>
            </div>
        </div>
    );
};

export default VolunteerNeed;
