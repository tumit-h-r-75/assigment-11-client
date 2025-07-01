import React, { useContext } from "react";
import { motion } from "framer-motion";
import { FaHandsHelping, FaClock, FaGlobe } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const benefits = [
  {
    icon: <FaHandsHelping className="text-4xl text-blue-600" />,
    title: "Make a Real Impact",
    description:
      "Contribute to meaningful causes and help communities in need through your time and skills.",
  },
  {
    icon: <FaClock className="text-4xl text-green-600" />,
    title: "Flexible Timing",
    description:
      "Choose volunteer opportunities that fit your schedule and availability.",
  },
  {
    icon: <FaGlobe className="text-4xl text-purple-600" />,
    title: "Connect Globally",
    description:
      "Join a network of passionate volunteers from around the world and expand your horizons.",
  },
];

const VolunteerBenefits = () => {
  const { theme } = useContext(AuthContext);

  return (
    <section className="py-16 px-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center mb-12"
      >
        Why Volunteer With Us?
      </motion.h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {benefits.map((benefit, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.3 }}
            className={`p-8 rounded-xl shadow-md text-center ${
              theme === "light" ? "bg-gray-50" : "bg-gray-900"
            }`}
          >
            <div className="flex justify-center mb-6">{benefit.icon}</div>
            <h3
              className={`text-xl font-semibold mb-2 ${
                theme === "light" ? "text-gray-900" : "text-white"
              }`}
            >
              {benefit.title}
            </h3>
            <p
              className={`${
                theme === "light" ? "text-gray-900" : "text-white"
              }`}
            >
              {benefit.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default VolunteerBenefits;
