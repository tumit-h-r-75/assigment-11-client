import React, { use } from 'react';
import { Link } from 'react-router';

const VolunteerNeed = ({ VolunteerNeedPromise }) => {
    const volunteerPosts = use(VolunteerNeedPromise);

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-8 text-center">Volunteer Needs Now</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {volunteerPosts.map((post, index) => (
                    <div key={index} className="rounded-xl shadow-md border p-4 bg-white">
                        <img src={post.thumbnail} alt={post.title} className="w-full h-48 object-cover rounded-md mb-4" />
                        <h3 className="text-xl font-semibold">{post.title}</h3>
                        <p className="text-sm text-gray-600 mt-1"><span className="font-medium">Category:</span> {post.category}</p>
                        <p className="text-sm text-gray-600 mt-1"><span className="font-medium">Deadline:</span> {post.deadline}</p>
                        
                        <div className="mt-4">
                            <Link to={`/detials/${post._id}`}>
                                <button className="btn bg-blue-600 hover:bg-blue-700 text-white w-full">View Details</button>
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
