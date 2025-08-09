import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

import room1 from "../assets/slider-2.jpg";
import room2 from "../assets/slider-1.avif";
import room3 from "../assets/slider-3.jpg";
import room4 from "../assets/slider-4.jpg";
import room5 from "../assets/slider-5.jpg";
import { use } from "react";
import { AuthContext } from "../context/AuthContext";

const Banner = () => {
  const { theme } = use(AuthContext);
  const isDark = theme === "dark";
  const images = [room1, room2, room3, room4, room5];

  return (
    <section className={`py-14 lg:py-24 rounded-3xl transition-all duration-300 ${isDark ? "text-white " : "text-black"}`}>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Left Side Text */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          <h1 className={`text-4xl md:text-5xl font-extrabold leading-snug ${isDark ? "text-blue-300" : "text-blue-700"}`}>
            Connect with Volunteers <br /> Who Make a Difference
          </h1>
          <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Discover dedicated individuals ready to support your cause. Join a community that's changing lives every day.
          </p>
          <Link
            to="/all-posts"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl shadow-lg text-lg transition-all duration-200"
          >
            Find Volunteers
          </Link>
        </div>

        {/* Right Side Swiper */}
        <div className="flex-1 flex justify-center">
          <div className="w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] h-[340px]">
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards, Autoplay]}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              className="w-full h-full"
            >
              {images.map((img, i) => (
                <SwiperSlide key={i}>
                  <div className="w-full h-[300px] md:h-[350px] lg:h-[380px]">
                    <img
                      src={img}
                      alt={`volunteer-${i}`}
                      className="w-full h-full object-cover rounded-3xl shadow-2xl"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
