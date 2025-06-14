import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router';
import Lottie from 'lottie-react';
import errorAnim from '../assets/Error-ani.json';

const Error = () => {
  return (
    <div className="w-full p-5 min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Helmet>
        <title>VolunteerHub || Error</title>
      </Helmet>
      <div className="bg-white text-center p-8 rounded-xl shadow-lg max-w-xl">
        <div className="w-full mb-6">
          <Lottie animationData={errorAnim} loop={true} />
        </div>
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