import React, { use } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLoaderData } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const VolunteerDetails = () => {
    const details = useLoaderData();
    const { theme } = use(AuthContext);

    return (
        <div className="max-w-5xl mx-auto px-4 py-10 pt-20">
            <Helmet>
                <title>VolunteerHub || Details</title>
            </Helmet>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Image Section with Animation */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <img
                        src={details.thumbnail}
                        alt={details.title}
                        className="w-full h-fit object-cover rounded-xl shadow"
                    />
                </motion.div>

                {/* Details Section with Animation */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Heading */}
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="text-3xl font-bold mb-3"
                    >
                        {details.title}
                    </motion.h2>

                    {/* Description */}
                    <p
                        className={`mb-4 ${theme === "dark"
                            ? "text-white"
                            : "text-black"
                            }`}
                    >
                        {details.description}
                    </p>

                    {/* Info section */}
                    <div
                        className={`space-y-2 mb-4 ${theme === "dark"
                            ? "text-white"
                            : "text-black"
                            }`}
                    >
                        <p><strong>Category:</strong> {details.category}</p>
                        <p><strong>Location:</strong> {details.location}</p>
                        <p><strong>Volunteers Needed:</strong> {details.volunteersNeeded}</p>
                        <p><strong>Deadline:</strong> {details.deadline}</p>
                        <p><strong>Organizer:</strong> {details.organizerName}</p>
                        <p><strong>Email:</strong> {details.organizerEmail}</p>
                    </div>

                    {/* Button with animation */}
                    {details.volunteersNeeded === 0 ? (
                        <p className="mt-6 text-red-600 font-semibold">
                            Volunteers are no longer needed for this post.
                        </p>
                    ) : (
                        <Link to={`/be-a-volunteer/${details._id}`}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg"
                            >
                                Be a Volunteer
                            </motion.button>
                        </Link>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default VolunteerDetails;
