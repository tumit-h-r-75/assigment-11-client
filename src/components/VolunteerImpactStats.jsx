import React, { use } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { FaUserCheck, FaHandsHelping, FaClipboardList } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const stats = [
  {
    icon: <FaUserCheck className="text-3xl text-blue-600" />,
    label: "Registered Volunteers",
    value: 324,
  },
  {
    icon: <FaClipboardList className="text-3xl text-green-600" />,
    label: "Volunteer Posts",
    value: 87,
  },
  {
    icon: <FaHandsHelping className="text-3xl text-purple-600" />,
    label: "Volunteer Requests",
    value: 196,
  },
];

const VolunteerImpactStats = () => {
  const {theme} = use(AuthContext)
  return (
    <section className="py-16 px-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center  mb-12"
      >
        Our Volunteer Impact
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={` shadow-lg rounded-2xl p-8 text-center border  ${theme==='light'?'bg-white border-gray-200':'bg-gray-800 border-gray-700 '}`}
          >
            <div className={"flex justify-center mb-4"}>{item.icon}</div>
            <h3 className={`text-4xl font-extrabold ${theme==='light'?'text-black':'text-white'}`}>
              <CountUp end={item.value} duration={2} />
            </h3>
            <p className={`mt-2 font-semibold${theme==='light'?'text-gray-300':'text-gray-800'}`}>
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default VolunteerImpactStats;
