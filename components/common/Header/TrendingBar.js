"use client";

import Link from "next/link";
import Container from "../Container";
import { TrendingUp } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const TrendingBar = ({ trendingTags }) => {
  if (!trendingTags?.length) return null;

  const canLoop = trendingTags.length > 4;

  return (
    <div className="bg-white py-3.5 border-b border-gray-100">
      <Container>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 shrink-0 bg-red-100 px-3 md:px-4 py-0.5">
            <span className="text-[#EE1D23] font-black text-[15px] sm:text-base md:text-lg">
              ট্রেন্ডিং
            </span>
            <TrendingUp size={16} className="text-[#EE1D23]" />
          </div>

          <div className="min-w-0 flex-1 overflow-hidden">
            {canLoop ? (
              <Swiper
                modules={[Autoplay]}
                spaceBetween={8}
                slidesPerView="auto"
                loop
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                className="overflow-visible!"
              >
                {trendingTags.map((topic) => (
                  <SwiperSlide key={topic.id} className="w-auto!">
                    <Link
                      href={`/category/${topic.slug}`}
                      className="bg-gray-200 px-3 py-1 text-[#003366] text-[15px] font-black uppercase transition-colors hover:text-[#EE1D23] sm:text-base md:px-4 md:text-lg"
                    >
                      {topic.name}
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
                {trendingTags.map((topic) => (
                  <Link
                    key={topic.id}
                    href={`/category/${topic.slug}`}
                    className="bg-gray-200 px-3 py-1 text-[#003366] text-[15px] font-black uppercase transition-colors hover:text-[#EE1D23] sm:text-base md:px-4 md:text-lg"
                  >
                    {topic.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TrendingBar;
