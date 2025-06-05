import React from 'react';
import { motion } from 'framer-motion';
import banner1 from '../assets/banner-1.avif';
import banner2 from '../assets/banner-2.jpg';
import banner3 from '../assets/banner-3.avif'; 

const Banner = () => {
    const textVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: 'easeOut' },
        },
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            transition: { duration: 0.3 },
            boxShadow: '0px 0px 8px rgb(0, 102, 255)',
        },
    };

    const slides = [
        {
            id: 1,
            img: banner1,
            title: 'Empower Your Community with VolunteerHub',
            desc: 'Discover local and global volunteering opportunities that match your passion.',
        },
        {
            id: 2,
            img: banner2,
            title: 'Connect & Collaborate for a Better Tomorrow',
            desc: 'Join hands with like-minded individuals to make a real impact.',
        },
        {
            id: 3,
            img: banner3,
            title: 'Be the Change You Wish to See',
            desc: 'Build leadership skills, friendships, and memories through service.',
        },
    ];

    return (
        <div className="w-full overflow-hidden">
            <div className="carousel w-full">
                {slides.map((slide, index) => (
                    <div
                        id={`slide${slide.id}`}
                        key={slide.id}
                        className="carousel-item relative w-full"
                    >
                        <motion.img
                            src={slide.img}
                            alt={`Banner ${slide.id}`}
                            className="w-full h-[85vh] object-cover brightness-75"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 10, repeat: Infinity }}
                        />
                        <div className="absolute flex flex-col justify-center items-start h-full w-full px-10 md:px-24 text-white bg-black/40">
                            <motion.h1
                                className="text-3xl md:text-5xl font-bold"
                                variants={textVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {slide.title}
                            </motion.h1>
                            <motion.p
                                className="mt-4 text-lg md:text-xl max-w-xl"
                                variants={textVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 0.3 }}
                            >
                                {slide.desc}
                            </motion.p>
                            <motion.button
                                variants={buttonVariants}
                                whileHover="hover"
                                className="mt-6 btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                            >
                                Join Now
                            </motion.button>
                        </div>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 bottom-5">
                            <a href={`#slide${index === 0 ? slides.length : index}`} className="btn btn-circle">❮</a>
                            <a href={`#slide${index === slides.length - 1 ? 1 : index + 2}`} className="btn btn-circle">❯</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Banner;
