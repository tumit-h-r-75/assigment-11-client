import React, { use } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLoaderData } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const VolunteerDetails = () => {
    const details = useLoaderData();
    const {theme} = use(AuthContext)
    return (
        <div className="max-w-5xl mx-auto px-4 py-10 pt-20">
            <Helmet>
                <title>VolunteerHub || Details</title>
            </Helmet>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left side: Image */}
                <div>
                    <img
                        src={details.thumbnail}
                        alt={details.title}
                        className="w-full h-fit object-cover rounded-xl shadow"
                    />
                </div>

                {/* Right side: Details */}
                <div>
                    <h2 className="text-3xl font-bold mb-3">{details.title}</h2>
                    <p className={` mb-4 ${theme === "dark"
                                ? " text-white border-gray-600"
                                : " text-black border-gray-300"
                                }`}>{details.description}</p>

                    <div className={` space-y-2 mb-4 ${theme === "dark"
                                ? " text-white border-gray-600"
                                : " text-black border-gray-300"
                                }`}>
                        <p><strong>Category:</strong> {details.category}</p>
                        <p><strong>Location:</strong> {details.location}</p>
                        <p><strong>Volunteers Needed:</strong> {details.volunteersNeeded}</p>
                        <p><strong>Deadline:</strong> {details.deadline}</p>
                        <p><strong>Organizer:</strong> {details.organizerName}</p>
                        <p><strong>Email:</strong> {details.organizerEmail}</p>
                    </div>

                    <Link to={`/be-a-volunteer/${details._id}`}>
                        <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg">
                            Be a Volunteer
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default VolunteerDetails;
