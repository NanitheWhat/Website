import React, { useState } from 'react';

const projects = [
  {
    title: "Project 1",
    description: "Description of Project 1",
    media: [
      { type: "image", src: "/images/20221126_142049.jpg" },
      { type: "video", src: "/videos/video1.mp4" },
    ],
  },
  {
    title: "Project 2",
    description: "Description of Project 2",
    media: [
      { type: "image", src: "/images/20221126_142053.jpg" },
      { type: "video", src: "/videos/video2.mp4" },
    ],
  },
  {
    title: "Project 3",
    description: "Description of Project 3",
    media: [
      { type: "image", src: "/images/image3.jpg" },
      { type: "video", src: "/videos/video3.mp4" },
    ],
  },
];

const TabbedPortfolio = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Portfolio</h1>
      <div className="flex border-b mb-4">
        {projects.map((project, index) => (
          <button
            key={index}
            className={`py-2 px-4 transition-colors duration-300 ${
              activeTab === index
                ? 'border-b-2 border-blue-500 text-blue-500 font-semibold'
                : 'text-gray-600 hover:text-blue-500'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {project.title}
          </button>
        ))}
      </div>
      <div className="tab-content">
        <h2 className="text-2xl font-semibold">{projects[activeTab].title}</h2>
        <p className="mb-4 text-gray-700">{projects[activeTab].description}</p>
        <div className="media-gallery grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects[activeTab].media.map((item, idx) => (
            item.type === "image" ? (
              <img key={idx} src={item.src} alt={`Media ${idx + 1}`} className="rounded-lg shadow-md" />
            ) : (
              <video key={idx} controls className="rounded-lg shadow-md">
                <source src={item.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabbedPortfolio;

/* import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css'; // Import Splide styles

const SplideTest = () => {
  return (
    <div>
      <h1>Splide Test Page</h1>
      <Splide aria-label="test">
        <SplideSlide>
          <img src="/images/20221126_142049.jpg" alt="Image 1" />
        </SplideSlide>
        <SplideSlide>
          <img src="/images/20221126_142053.jpg" alt="Image 2" />
        </SplideSlide>
      </Splide>
    </div>
  );
};

export default SplideTest;
*/