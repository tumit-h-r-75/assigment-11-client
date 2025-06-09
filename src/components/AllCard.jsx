'use client';
import React, { use, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { searchApiPromise } from '../api/SearchApi';
import Loader from './Loader';

const AllCard = () => {
    const { loading, setLoading } = use(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

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
            {/* 🔍 Search Box */}
            <div className="mb-10 max-w-xl mx-auto relative">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full text-white border border-gray-300 rounded-full px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <span className="absolute right-4 top-3 text-gray-400">
                    🔍
                </span>
            </div>

            {/* 🔁 Loading Spinner */}
            {loading ? (
                <Loader></Loader>
            ) : filteredData.length === 0 ? (
                <Loader></Loader>
            ) : (
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {filteredData.map((post) => (
                        <div key={post._id} className="card shadow-md bg-base-100 rounded-xl overflow-hidden">
                            <figure>
                                <img
                                    src={post.thumbnail}
                                    alt={post.title}
                                    className="w-full h-48 object-cover"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title text-lg font-semibold">{post.title}</h2>
                                <p className="text-sm text-gray-600">Category: {post.category}</p>
                                <p className="text-sm text-gray-600">Location: {post.location}</p>
                                <p className="text-sm text-gray-600">Deadline: {post.deadline}</p>
                                <div className="card-actions justify-end mt-4">
                                    <Link to={`/detials/${post._id}`} className="btn btn-sm btn-primary">
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
