'use client';
import React, { use, useState } from 'react';
import { Link } from 'react-router';

const AllCard = ({ AllPostsPromise }) => {
  const allData = use(AllPostsPromise);
  const [searchTerm, setSearchTerm] = useState('');

  // Search filter
  const filteredData = allData.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-4 lg:px-16 py-10">
      {/* Search Box */}
      <div className="mb-6 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search by Title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

      {/* Card Grid */}
      {filteredData.length === 0 ? (
        <p className="text-center text-gray-500">No posts found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredData.map((post) => (
            <div key={post._id} className="card shadow-md bg-base-100 rounded-xl overflow-hidden">
              <figure>
                <img src={post.thumbnail} alt={post.title} className="w-full h-48 object-cover" />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-lg font-semibold">{post.title}</h2>
                <p className="text-sm text-gray-600">Category: {post.category}</p>
                <p className="text-sm text-gray-600">Location: {post.location}</p>
                <p className="text-sm text-gray-600">Deadline: {post.deadline}</p>
                <div className="card-actions justify-end mt-4">
                  <Link
                    to={`/detials/${post._id}`}
                    className="btn btn-sm btn-primary"
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
