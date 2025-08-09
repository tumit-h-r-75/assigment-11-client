import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen text-center ">
      <div className="relative w-20 h-20">
        {/* Outer ring */}
        <span className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-indigo-500 opacity-75 animate-pulse-ring"></span>
        {/* Middle ring */}
        <span className="absolute top-1/2 left-1/2 w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-purple-400 opacity-75 animate-pulse-ring animation-delay-200"></span>
        {/* Inner ring */}
        <span className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-pink-400 opacity-75 animate-pulse-ring animation-delay-400"></span>
        {/* Center dot */}
        <span className="absolute top-1/2 left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-lg animate-pulse"></span>
      </div>
      <style>
        {`
          @keyframes pulse-ring {
            0% {
              transform: translate(-50%, -50%) scale(0.9);
              opacity: 0.75;
            }
            50% {
              transform: translate(-50%, -50%) scale(1.2);
              opacity: 0.3;
            }
            100% {
              transform: translate(-50%, -50%) scale(0.9);
              opacity: 0.75;
            }
          }
          .animate-pulse-ring {
            animation: pulse-ring 2s ease-in-out infinite;
          }
          .animation-delay-200 {
            animation-delay: 0.2s;
          }
          .animation-delay-400 {
            animation-delay: 0.4s;
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
