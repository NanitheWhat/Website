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
  const [isMuted, setIsMuted] = useState(true);

  // Function to toggle mute/unmute
  const toggleMute = () => {
    const video = document.getElementById("video-player");
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

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
            muted
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
            className="absolute bottom-4 left-4 p-2 bg-gray-900 bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition"
          >
            {isMuted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 9l10 10M9 15l10-10m1 5a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12h.01M19 7l-7 7m0 0l-7 7m7-7l7-7m0 14V6a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2h4m0 0l-7-7"
                />
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
