import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import aboutImg from '../assets/about-img.jpg';

const About = () => {
    const { theme } = useContext(AuthContext);

    return (
        <div className={`py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            {/* Heading */}
            <motion.h2
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent"
            >
                About VolunteerHub
            </motion.h2>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {/* Image */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <img
                        src={aboutImg}
                        alt="About VolunteerHub"
                        className="rounded-3xl shadow-2xl border-4 border-blue-400 dark:border-cyan-600"
                    />
                </motion.div>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6 text-base sm:text-lg leading-relaxed"
                >
                    <p>
                        <strong>VolunteerHub</strong> is a dynamic platform connecting passionate individuals with impactful volunteer opportunities. From healthcare to education and community services — we believe every act of kindness counts.
                    </p>
                    <p>
                        Organizers can easily publish their needs, and volunteers can browse and apply with just a few clicks. Our focus is on simplicity, trust, and bringing meaningful change to society through active involvement.
                    </p>
                    <p>
                        With an ever-growing network of change-makers, we aim to build a stronger, more united world. Together, we rise — one volunteer at a time.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
