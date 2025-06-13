import React, { use, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { searchApiPromise } from '../api/SearchApi';
import Loader from './Loader';

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

  return (
    <div className="px-4 lg:px-16 py-10">
      <h2
        className={`text-3xl font-bold mb-6 text-center ${
          theme === 'light' ? 'text-black' : 'text-white'
        }`}
      >
        Need Volunteer
      </h2>

      {/* Layout Toggle Button */}
      <div className="flex justify-center mb-10">
        <button
          onClick={() => setIsTableLayout(!isTableLayout)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
        >
          {isTableLayout ? 'Switch to Grid' : 'Switch to Table'}
        </button>
      </div>

      {/* Search Box */}
      <div className="mb-10 max-w-xl mx-auto relative">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full border rounded-full px-5 py-3 shadow-sm focus:outline-none focus:ring-2 transition-all
              ${
                theme === 'dark'
                  ? 'bg-gray-800 text-white border-gray-600 focus:ring-blue-400 placeholder-gray-400'
                  : 'bg-white text-black border-gray-300 focus:ring-blue-500 placeholder-gray-500'
              }`}
        />
        <span
          className={`absolute right-4 top-3 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          🔍
        </span>
      </div>

      {/* Loading */}
      {loading ? (
        <Loader />
      ) : filteredData?.length === 0 ? (
        <p className={`text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          No results found.
        </p>
      ) : isTableLayout ? (
        
        // Table Layout
        <table
          className={`min-w-full border-collapse ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}
        >
          <thead>
            <tr>
              <th className="border p-3 text-left">Thumbnail</th>
              <th className="border p-3 text-left">Title</th>
              <th className="border p-3 text-left">Category</th>
              <th className="border p-3 text-left">Location</th>
              <th className="border p-3 text-left">Deadline</th>
              <th className="border p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((post) => (
              <tr
                key={post._id}
                className={`hover:bg-gray-100 ${
                  theme === 'dark' ? 'hover:bg-gray-700' : ''
                }`}
              >
                <td className="border p-3">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-20 h-12 object-cover rounded"
                  />
                </td>
                <td className="border p-3">{post.title}</td>
                <td className="border p-3">{post.category}</td>
                <td className="border p-3">{post.location}</td>
                <td className="border p-3">{post.deadline}</td>
                <td className="border p-3">
                  <Link
                    to={`/detials/${post._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        // Grid Layout
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredData?.map((post) => (
            <div
              key={post._id}
              className={`rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 group
                ${
                  theme === 'dark'
                    ? 'bg-gray-800'
                    : 'bg-white'
                }`}
            >
              {/* Thumbnail */}
              <div className="overflow-hidden h-48">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-2 space-y-2">
                <h3
                  className={`text-lg font-bold transition duration-300 ${
                    theme === 'dark'
                      ? 'text-white group-hover:text-blue-400'
                      : 'text-gray-800 group-hover:text-blue-600'
                  }`}
                >
                  {post.title}
                </h3>

                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  📂 <span className="font-medium">Category:</span> {post.category}
                </p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  📍 <span className="font-medium">Location:</span> {post.location}
                </p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  ⏳ <span className="font-medium">Deadline:</span> {post.deadline}
                </p>

                {/* Button */}
                <div className="pt-4">
                  <Link
                    to={`/detials/${post._id}`}
                    className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCard;
