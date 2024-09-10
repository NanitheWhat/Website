import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import SwiperCore, { Navigation, Pagination, EffectCoverflow } from "swiper";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles (use the correct path)
import 'swiper/css'; // Core Swiper styles
import 'swiper/css/navigation'; // Navigation module
import 'swiper/css/pagination'; // Pagination module

// If you're using any other Swiper modules, import them here

SwiperCore.use([Navigation, Pagination, EffectCoverflow]);

const ProjectCarousel = ({ project }) => {
  const [currentProject, setCurrentProject] = useState(0);

  return (
    <div className="outer-carousel">
      {/* Outer Carousel: Project Media */}
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setCurrentProject(swiper.activeIndex)}
        effect={"coverflow"}
        centeredSlides={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        className="project-swiper"
      >
        {project.media.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={img}
              alt={`Project ${project.title} Image ${idx}`}
              className="w-full h-auto rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Related Projects */}
      <div className="related-projects mt-4">
        <h3 className="text-xl font-semibold">Related Projects:</h3>
        <ul>
          {project.relatedProjects.map((related, idx) => (
            <li key={idx} className="my-2">
              {related.title} (ID: {related.id})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectCarousel;
