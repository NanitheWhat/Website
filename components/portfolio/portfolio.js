import React, { useState, useEffect, useRef } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useRouter } from 'next/router';
import '@splidejs/react-splide/css';
import Cursor from '../Cursor';
import Header from '../Header';
import Footer from '../Footer';
import Button from '../Button';
import Link from 'next/link';
import WorkCard from '../WorkCard';
import { useTheme } from 'next-themes';

const TabbedPortfolio = ({ projects = [], projectType }) => {

  console.log('Received projects:', projects);
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const sliderRef = useRef();
  const { theme } = useTheme();

  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    console.log('Project Type:', projectType);
    
    projects.forEach(p => {
      console.log('Project ProjectType:', p.ProjectType);
    });
  
    if (projects && projects.length > 0) {
      const filtered = projects.filter(project => 
        project.ProjectType.toLowerCase().replace(/\s+/g, '-') === projectType.toLowerCase()
      );
      console.log('Filtered Projects:', filtered);
      setFilteredProjects(filtered);
      setActiveTab(0);
    } else {
      setFilteredProjects([]);
      setActiveTab(-1);
    }
  }, [projects, projectType]);
  

  const toggleMute = () => {
    const video = document.getElementById("video-player");
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  useEffect(() => {
  console.log('Projects:', projects);
  console.log('Project Type:', projectType);

  if (projects && projects.length > 0) {
    const filtered = projects.filter(project => 
      project.ProjectType.toLowerCase().replace(/\s+/g, '-') === projectType.toLowerCase()
    );
    console.log('Filtered Projects:', filtered);
    setFilteredProjects(filtered);
    setActiveTab(0);
  } else {
    console.log('Filtered Projects: []');
    setFilteredProjects([]);
  }
}, [projects, projectType]);
  

  const otherProjectTypes = projects
    .filter(project => project.ProjectType.toLowerCase().replace(/\s+/g, '-') !== projectType.toLowerCase())
    .reduce((acc, project) => {
      if (!acc.some(p => p.ProjectType === project.ProjectType)) {
        acc.push(project);
      }
      return acc;
    }, []);
    console.log('filteredProjects:', filteredProjects);
    console.log('activeTab:', activeTab);
    console.log('mainVideo:', filteredProjects[activeTab]?.mainVideo);

  return (
    <div className="relative container mx-auto mb-10 cursor-none">
      <Cursor />
      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <Header />

      <Link href="/">
        <a className={`text-lg hover:scale-105 active:scale-100 tablet:first:ml-0 hover:bg-slate-300 dark:text-white tablet:text-base p-2 m-10 laptop:m-2 rounded-lg border-none duration-300 first:ml-0 hover:scale-105 active:scale-100 link ${theme === 'light' ? 'bg-white text-black' : 'dark:bg-gray-800 dark:text-white'}`}>
          <span className="mr-2">←</span> {projectType}
        </a>
      </Link>
      

      {filteredProjects.length > 0 ? (
        <div className="flex justify-center mb-4 bg-transparent p-1">
          {filteredProjects.map((project, index) => (
            <Button
              key={index}
              type="primary"
              onClick={() => setActiveTab(index)}
              classes={`text-base tablet:text-lg laptop:text-xl p-2 m-1 laptop:m-2 rounded-lg flex items-center transition-all ease-out duration-300 link ${activeTab === index ? '' : ''}`}
            >
              {project.title}
            </Button>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg">No {projectType.replace(/-/g, ' ')} projects available.</p>
      )}

      {filteredProjects.length > 0 && (
        <div className="tab-content justify-center">
          <h2 className="flex justify-center text-2xl tablet:text-4xl laptop:text-4xl laptopl:text-5xl p-2 tablet:p-4 font-bold leading-relaxed w-full transition-opacity duration-500 ease-in-out">
            {filteredProjects[activeTab]?.title || 'No Title'}
          </h2>

          <div className="relative max-w-4xl mx-auto">
            {filteredProjects.length > 0 && filteredProjects[activeTab] ? (
              <>
                <video
                  className="mb-4 rounded-lg shadow-md"
                  muted={isMuted}
                  loop
                  autoPlay
                  id="video-player"
                >
                <source 
                  src={filteredProjects[activeTab]?.mainVideo} 
                  type="video/mp4" 
                />
                {console.log('Video source:', filteredProjects[activeTab]?.mainVideo)}
                </video>

                <Button
                  type="primary"
                  onClick={toggleMute}
                  classes="absolute bottom-4 left-4 p-3 bg-gray-800 bg-opacity-70 text-white rounded-full hover:bg-opacity-90 transition-transform transform hover:scale-110"
                >
                  {isMuted ? 'Unmute' : 'Mute'}
                </Button>
              </>
            ) : (
              <p>No video available for this project.</p>
            )}
          </div>

          <div
            className="mb-10 mt-10 flex text-xl leading-relaxed justify-center text-center text-gray-300 px-64"
            dangerouslySetInnerHTML={{ __html: filteredProjects[activeTab]?.description || 'No Description' }}
          />

          <div className="flex justify-center">
            <div className="w-1/5">
              <Splide aria-label="Image Carousel" options={{ type: 'loop', perPage: 1, pagination: true }}>
                {filteredProjects[activeTab]?.media.map((image, idx) => (
                  <SplideSlide key={idx}>
                    <div className="aspect-w-1 aspect-h-1">
                      <img
                        src={image}
                        alt={`Project ${filteredProjects[activeTab]?.id} Image ${idx + 1}`}
                        className="object-cover w-full h-[50%] rounded-lg shadow-md"
                      />
                    </div>
                  </SplideSlide>
                )) || (
                  <SplideSlide>
                    <div className="aspect-w-1 aspect-h-1">
                      <img
                        src="/default-image.jpg"
                        alt="Default Image"
                        className="object-cover w-full h-[50%] rounded-lg shadow-md"
                      />
                    </div>
                  </SplideSlide>
                )}
              </Splide>
            </div>
          </div>

          <div className="mt-5 laptop:mt-10 grid grid-cols-1 tablet:grid-cols-2 gap-4">
            {otherProjectTypes.map(project => (
              <WorkCard
                key={project.id}
                img={project.media[0] || '/default-image.jpg'}
                name={project.title}
                description={project.description}
                onClick={() => router.push(`/projects/${project.ProjectType.toLowerCase().replace(/\s+/g, '-')}`)}
              />
            ))}
          </div>
        </div>
      )}
      

      <Footer />
    </div>
  );
};

export default TabbedPortfolio;