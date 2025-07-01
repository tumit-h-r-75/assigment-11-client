import React, { use, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { searchApiPromise } from '../api/SearchApi';
import Loader from './Loader';
import { motion } from 'framer-motion';
import { HiViewList, HiViewGrid } from "react-icons/hi";

const AllCard = ({ AllPostsPromise }) => {
  const { loading, setLoading, theme } = use(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(AllPostsPromise);
  const [isTableLayout, setIsTableLayout] = useState(false);

  useEffect(() => {
    setLoading(true);
    searchApiPromise(searchTerm)
      .then((res) => res.json())
      .then((data) => setFilteredData(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [searchTerm, setLoading]);

  const isDark = theme === 'dark';

  return (
    <div className="px-4 lg:px-16 py-10">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`text-3xl font-bold mb-6 text-center ${isDark ? 'text-white' : 'text-black'}`}
      >
        Need Volunteer
      </motion.h2>

      {/* Search + Layout Toggle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-10 max-w-6xl mx-auto w-full flex flex-col gap-4"
      >
        {/* Search Input */}
        <div className="w-full relative">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full border rounded-full px-5 py-3 shadow-sm focus:outline-none focus:ring-2 transition-all
              ${isDark
                ? 'bg-gray-800 text-white border-gray-600 focus:ring-blue-400 placeholder-gray-400'
                : 'bg-white text-black border-gray-300 focus:ring-blue-500 placeholder-gray-500'
              }`}
          />
          <span className={`absolute right-4 top-3 text-xl ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            🔍
          </span>
        </div>

        {/* Layout Toggle Button */}
        <div className="self-end">
          <button
            onClick={() => setIsTableLayout(!isTableLayout)}
            className={`px-5 py-2.5 rounded-full font-medium flex items-center gap-2 transition duration-300 shadow-md
              ${isDark
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
            `}
          >
            {isTableLayout ? (
              <>
                <HiViewGrid className="text-xl" />
              </>
            ) : (
              <>
                <HiViewList className="text-xl" />
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Loader or Content */}
      {loading ? (
        <Loader />
      ) : filteredData?.length === 0 ? (
        <p className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          No results found.
        </p>
      ) : isTableLayout ? (
        // Table View
        <div className="overflow-x-auto w-full">
          <motion.table
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`min-w-[800px] w-full border-collapse text-sm rounded-lg overflow-hidden
              ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
          >
            <thead>
              <tr className={`${isDark ? 'bg-gray-800' : 'bg-gray-100'} text-left text-sm uppercase tracking-wider`}>
                <th className="p-3 border-b border-gray-300 dark:border-gray-700">Thumbnail</th>
                <th className="p-3 border-b border-gray-300 dark:border-gray-700">Title</th>
                <th className="p-3 border-b border-gray-300 dark:border-gray-700">Category</th>
                <th className="p-3 border-b border-gray-300 dark:border-gray-700">Location</th>
                <th className="p-3 border-b border-gray-300 dark:border-gray-700">Deadline</th>
                <th className="p-3 border-b border-gray-300 dark:border-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((post, i) => (
                <motion.tr
                  key={post._id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`transition duration-200 hover:bg-blue-400 dark:hover:bg-gray-800 border-b
                    ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
                >
                  <td className="p-3">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-20 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="p-3">{post.title}</td>
                  <td className="p-3">{post.category}</td>
                  <td className="p-3">{post.location}</td>
                  <td className="p-3">{post.deadline}</td>
                  <td className="p-3">
                    <Link
                      to={`/details/${post._id}`}
                      className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                    >
                      📄 View
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>
      ) : (
        // Grid View
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredData?.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-2xl shadow-lg hover:shadow-xl transition duration-300 p-5 group 
                ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className="overflow-hidden h-48">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-2">
                <h3 className={`text-lg font-bold transition duration-300 
                  ${isDark ? 'text-white group-hover:text-blue-400' : 'text-gray-800 group-hover:text-blue-600'}`}>
                  {post.title}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  📂 <span className="font-medium">Category:</span> {post.category}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  📍 <span className="font-medium">Location:</span> {post.location}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  ⏳ <span className="font-medium">Deadline:</span> {post.deadline}
                </p>
                <div className="pt-4">
                  <Link
                    to={`/detials/${post._id}`}
                    className="inline-flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300"
                  >
                    🎯 View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCard;
