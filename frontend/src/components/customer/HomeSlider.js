"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    title: "Fast Food Delivery",
    desc: "Get your favorite meals delivered in minutes!",
    img: "/assets/slider_bg_1.jpg",
  },
  {
    id: 2,
    title: "Fresh & Tasty",
    desc: "Enjoy freshly cooked dishes made with love.",
    img: "/assets/slider_bg_2.jpg",
  },
  {
    id: 3,
    title: "Order Anytime",
    desc: "We are here 24/7 to serve your cravings.",
    img: "/assets/slider_bg_3.jpg",
  },
];

export default function HomeSlider() {
  return (
    <div className="relative w-full h-[500px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop={true}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-[500px] bg-cover bg-center flex items-center justify-center text-white"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              <div className="bg-black/50 p-6 rounded-xl text-center max-w-xl">
                <h2 className="text-3xl font-bold mb-3">{slide.title}</h2>
                <p className="text-lg">{slide.desc}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
