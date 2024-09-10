import React, { useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css'; // Import Splide styles
import Cursor from '../components/Cursor';

const projects = [
  {
    title: "Project 1",
    description: "Description of Project 1",
    mainVideo: "/videos/video1.mp4", // Path to the main video
    images: [
      "/images/20221126_142049.jpg.jpg",
      "/images/image2.jpg",
      "/images/image3.jpg",
    ],
  },
  {
    title: "Project 2",
    description: "Description of Project 2",
    mainVideo: "/videos/video2.mp4", // Path to the main video
    images: [
      "/images/20221126_142053.jpg.jpg",
      "/images/image5.jpg",
      "/images/image6.jpg",
    ],
  },
  {
    title: "Project 3",
    description: "Description of Project 3",
    mainVideo: "/videos/video3.mp4", // Path to the main video
    images: [
      "/images/image7.jpg",
      "/images/image8.jpg",
      "/images/image9.jpg",
    ],
  },
];

const TabbedPortfolio = () => {
  const [activeTab, setActiveTab] = useState(0);
  

  return (
    <div className="max-w-4xl mx-auto p-4 cursor-none">
      <Cursor/>
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
        <video controls className="w-full mb-4 rounded-lg shadow-md">
          <source src={projects[activeTab].mainVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p className="mb-4 text-gray-700">{projects[activeTab].description}</p>
        
        {/* Image Carousel */}
        <Splide aria-label="Image Carousel" options={{ type: 'loop', perPage: 1, pagination: true }}>
          {projects[activeTab].images.map((image, idx) => (
            <SplideSlide key={idx}>
              <img src={image} alt={`Project ${activeTab + 1} Image ${idx + 1}`} className="rounded-lg shadow-md" />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default TabbedPortfolio;