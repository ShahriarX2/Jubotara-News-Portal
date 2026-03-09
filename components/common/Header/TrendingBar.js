"use client";

import Link from "next/link";
import Container from "../Container";
import { TrendingUp } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const trendingTopics = [
  { id: 1, name: "নির্বাচন", slug: "/search?q=guthrie" },
  { id: 2, name: "বাজেট ২০২৫", slug: "/search?q=olympics" },
  { id: 3, name: "ক্রিকেট", slug: "/search?q=minnesota" },
  { id: 4, name: "আবহাওয়া", slug: "/search?q=iran" },
  { id: 5, name: "ডলার রেট", slug: "/search?q=dollar" },
  { id: 6, name: "শেয়ারবাজার", slug: "/search?q=stock" },
];

const TrendingBar = ({ trendingTags }) => {
  return (
    <div className=" py-3.5">
      <Container>
        <div className="flex items-center gap-4">

          {/* Left Title */}
          <div className="flex items-center gap-2 shrink-0 bg-red-100 px-3 md:px-4 py-0.5 w-25">
            <span className="text-[#EE1D23]  font-black text-[15px] sm:text-base md:text-lg ">
              ট্রেন্ডিং
            </span>
            <TrendingUp
              size={16}
              className="text-[#EE1D23]"
            //   strokeWidth={2.5}
            />
          </div>



          {/* Swiper Slider */}
          <div className=" overflow-hidden">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={8}
              slidesPerView="auto"
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              className="!overflow-visible"
            >
              {trendingTags?.map((topic) => (
                <SwiperSlide
                  key={topic.id}
                  className="!w-auto "
                >
                  <Link
                    href={`/category/${topic?.slug}`}
                    className="text-[#003366] font-black text-[15px] sm:text-base md:text-lg hover:text-[#EE1D23] transition-colors
                     uppercase   bg-gray-200 px-3 md:px-4 py-1"
                  >
                    {topic?.name}
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </Container>
    </div>
  );
};

export default TrendingBar;