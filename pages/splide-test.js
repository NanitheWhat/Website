import React, { useState, useEffect } from 'react';
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
  const [isMuted, setIsMuted] = useState(true);

  // Function to toggle mute/unmute
  const toggleMute = () => {
    const video = document.getElementById("video-player");
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  useEffect(() => {
    const video = document.getElementById("video-player");
    if (video) {
      video.play();
    }
  }, [activeTab]);

  return (
    <div className="max-w-4xl mx-auto p-4 cursor-none">
      <Cursor />
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

        {/* Video without default controls */}
        <div className="relative">
          <video
            className="w-full mb-4 rounded-lg shadow-md"
            muted={isMuted}
            loop
            autoPlay
            id="video-player"
          >
            <source src={projects[activeTab].mainVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Mute/Unmute button */}
          <button
            onClick={toggleMute}
            className="absolute bottom-4 left-4 p-3 bg-gray-800 bg-opacity-70 text-white rounded-full hover:bg-opacity-90 transition-transform transform hover:scale-110"
          >
            {isMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9l6 6m0 0l6-6m-6 6l6 6m-6-6l-6 6" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h1l1 1V9l1-1h7l1 1v1h1v-1a3 3 0 00-3-3H9a3 3 0 00-3 3v6a3 3 0 003 3h6a3 3 0 003-3v-1h-1v1l-1 1H8v-1h1l1-1" />
              </svg>
            )}
          </button>
        </div>

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
