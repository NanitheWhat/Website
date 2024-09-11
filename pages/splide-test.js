import React, { useState, useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css'; // Import Splide styles
import Cursor from '../components/Cursor';
import Header from '../components/Header'; // Import the Header component
import Footer from '../components/Footer'; // Import the Footer component
import Button from '../components/Button'; // Import the Button component
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
    <div className="relative container mx-auto mb-10 cursor-none">
      <Cursor />
      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <Header /> {/* Include the Header component */}

      <h1 className="text-3xl tablet:text-5xl laptop:text-5xl laptopl:text-6xl p-2 tablet:p-4 font-extrabold leading-relaxed w-full laptop:w-4/5 transition-opacity duration-500 ease-in-out">My Portfolio</h1>
      <div className="flex justify-center mb-4 bg-transparent p-1">
        {projects.map((project, index) => (
          <Button
            key={index}
            type="primary"
            onClick={() => setActiveTab(index)}
            classes={`transition-colors duration-300 text-lg mb-4 ${
              activeTab === index
                ? 'text-gray-800 font-semibold' // Active tab styles
                : 'text-gray-600' // Inactive tab styles
            }`}
          >
            {project.title}
          </Button>
        ))}
      </div>

      <div className="tab-content">
        <h2 className="text-2xl tablet:text-4xl laptop:text-4xl laptopl:text-5xl p-2 tablet:p-4 font-bold leading-relaxed w-full laptop:w-4/5 transition-opacity duration-500 ease-in-out">{projects[activeTab].title}</h2>
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
          <Button
            type="primary"
            onClick={toggleMute}
            classes="absolute bottom-4 left-4 p-3 bg-gray-800 bg-opacity-70 text-white rounded-full hover:bg-opacity-90 transition-transform transform hover:scale-110"
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
          </Button>
        </div>

        <p className="mb-4 text-gray-700">{projects[activeTab].description}</p>

        {/* Image Carousel */}
        <div className="flex justify-center">
          <div className="w-3/5">
            <Splide aria-label="Image Carousel" options={{ type: 'loop', perPage: 1, pagination: true }}>
              {projects[activeTab].media.map((image, idx) => (
                <SplideSlide key={idx}>
                  <div className="aspect-w-1 aspect-h-1">
                    <img src={image} alt={`Project ${projects[activeTab].id} Image ${idx + 1}`} className="object-cover w-full h-full rounded-lg shadow-md" />
                  </div>
                </SplideSlide>
              ))}
            </Splide>
          </div>
        </div>

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
      <Footer /> {/* Include the Footer component */}
    </div>
  );
};

export default TabbedPortfolio;