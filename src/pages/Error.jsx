import React from 'react';
import { Link } from 'react-router';

const Error = () => {
    return (
        <div className="w-full p-5 min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white text-center p-8 rounded-xl shadow-lg max-w-xl">
        <img src="https://i.ibb.co.com/4wMYc1d3/istockphoto-1404059706-612x612.jpg" alt="" className="w-full h-64 object-contain mx-auto mb-6 rounded-lg"
        />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="inline-block px-6 py-2 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition" > Go Back Home </Link>
      </div>
    </div>
    );
};

export default Error;