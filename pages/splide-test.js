import React, { useState, useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css'; // Import Splide styles
import Cursor from '../components/Cursor';
import projects from '../data/projects.json'; // Import the JSON file

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
        <p className="mb-2 text-gray-600">{projects[activeTab].ProjectType}</p>

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
          {projects[activeTab].media.map((image, idx) => (
            <SplideSlide key={idx}>
              <img src={image} alt={`Project ${projects[activeTab].id} Image ${idx + 1}`} className="rounded-lg shadow-md" />
            </SplideSlide>
          ))}
        </Splide>

        {/* Related Projects */}
        <h3 className="text-xl font-semibold mt-8 mb-4">Related Projects</h3>
        <div className="flex flex-wrap -mx-2">
          {projects[activeTab].relatedProjects.map((relatedProject) => (
            <div key={relatedProject.id} className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
              <div className="bg-white rounded-lg shadow-md p-4">
                <h4 className="text-lg font-semibold mb-2">{relatedProject.title}</h4>
                <a href={`/projects/${relatedProject.id}`} className="text-blue-500 hover:underline">
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabbedPortfolio;