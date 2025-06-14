import React, { use } from "react";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const VolunteerNeed = ({ VolunteerNeedPromise }) => {
  const volunteerPosts = use(VolunteerNeedPromise);
  const { theme } = use(AuthContext);
  const isDark = theme === "dark";

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      {/* Section Heading Animation */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`text-3xl font-bold mb-12 text-center ${isDark ? "text-white" : "text-black"}`}
      >
        Volunteer Needs Now
      </motion.h2>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {volunteerPosts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-5 group border 
              ${isDark ? "bg-gray-800 text-gray-200 border-gray-700" : "bg-white text-gray-800 border-gray-200"}`}
          >
            {/* Image Animation */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-xl mb-4"
            >
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-48 object-cover rounded-xl"
              />
            </motion.div>

            <h3 className={`text-xl font-semibold group-hover:text-blue-600 transition-colors duration-300 
              ${isDark ? "text-white" : "text-gray-800"}`}>
              {post.title}
            </h3>

            <div className={`mt-3 space-y-1 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              <p>
                <span className={`font-medium ${isDark ? "text-gray-100" : "text-gray-700"}`}>📁 Category:</span>{" "}
                {post.category}
              </p>
              <p>
                <span className={`font-medium ${isDark ? "text-gray-100" : "text-gray-700"}`}>⏰ Deadline:</span>{" "}
                {post.deadline}
              </p>
            </div>

            <div className="mt-6">
              <Link to={`/detials/${post._id}`}>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300">
                  View Details
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* See All Button */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12 text-center"
      >
        <Link to="/all-posts">
          <button
            className={`px-6 py-2 rounded-md transition font-medium 
              ${theme === "dark"
                ? "bg-gray-800 text-white hover:bg-gray-900"
                : "bg-white text-gray-900 hover:bg-gray-200"
              }`}
          >
            See All
          </button>
        </Link>
      </motion.div>
    </section>
  );
};

export default VolunteerNeed;
