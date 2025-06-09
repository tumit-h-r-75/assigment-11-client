import React from 'react';
import banner1 from '../assets/banner-1.avif';
import banner2 from '../assets/banner-2.jpg';
import banner3 from '../assets/banner-3.avif';

const Banner = () => {
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
        <div className="carousel w-full h-[85vh]">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    id={`slide${slide.id}`}
                    className="carousel-item relative w-full"
                >
                    <img
                        src={slide.img}
                        className="w-full h-full object-cover brightness-75"
                        alt={`Slide ${slide.id}`}
                    />
                    <div className="absolute inset-0  flex flex-col justify-center items-start px-6 md:px-20 text-white">
                        <h2 className="text-3xl md:text-5xl font-bold">{slide.title}</h2>
                        <p className="mt-3 text-lg md:text-xl max-w-xl">{slide.desc}</p>
                        <button className="mt-6 btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                            Join Now
                        </button>
                    </div>

                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a
                            href={`#slide${index === 0 ? slides.length : index}`}
                            className="btn btn-circle"
                        >
                            ❮
                        </a>
                        <a
                            href={`#slide${index === slides.length - 1 ? 1 : index + 2}`}
                            className="btn btn-circle"
                        >
                            ❯
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Banner;
