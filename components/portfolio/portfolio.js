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
import YouTube from 'react-youtube';

const TabbedPortfolio = ({ projects = [], projectType }) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const sliderRef = useRef();
  const videoRef = useRef(null);
  const { theme } = useTheme();

  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (projects && projects.length > 0) {
      const filtered = projects.filter(project => 
        project.ProjectType.toLowerCase().replace(/\s+/g, '-') === projectType.toLowerCase()
      );
      setFilteredProjects(filtered);
      setActiveTab(0);
    } else {
      setFilteredProjects([]);
      setActiveTab(-1);
    }
  }, [projects, projectType]);

  const handleVideoLoad = (event) => {
    if (event.target.getPlayerState() === YouTube.PlayerState.CUED) {
      event.target.playVideo();
    }
  };

  const otherProjectTypes = projects
    .filter(project => project.ProjectType.toLowerCase().replace(/\s+/g, '-') !== projectType.toLowerCase())
    .reduce((acc, project) => {
      if (!acc.some(p => p.ProjectType === project.ProjectType)) {
        acc.push(project);
      }
      return acc;
    }, []);

   return (
      <div className="relative container flex flex-col mx-auto min-h-screen max-h-screen cursor-none max-w-full p-4 sm:p-2 overflow-x-hidden">      
      <Cursor />
      <div className="gradient-circle"></div>

      <Header />
      <main className="flex-grow overflow-y-visible ">
      <div className="container mx-auto p-4 sm:p-2">
      <Link href="/">
        <a className={`text-lg hover:scale-105 active:scale-100 sm:text-base p-2 sm:m-4 laptop:m-2 rounded-lg border-none duration-300 first:ml-0 hover:bg-slate-300 dark:text-white link ${theme === 'light' ? 'bg-white text-black' : 'dark:bg-gray-800 dark:text-white'}`}>
          <span className="mr-2">←</span> Home
        </a>
      </Link>

      {filteredProjects.length > 0 ? (
        <div className="flex flex-wrap justify-center items-center gap-2 mb-4 bg-transparent p-1 w-full">
          {filteredProjects.map((project, index) => (
            <Button
              key={index}
              type="primary"
              onClick={() => setActiveTab(index)}
              classes={`flex-grow flex-shrink-0 basis-auto px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg laptop:text-xl rounded-lg flex items-center justify-center transition-all ease-out duration-300 link whitespace-nowrap ${
                activeTab === index ? 'active' : ''
              }`}
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
          <h2 className="flex justify-center text-2xl sm:text-xl tablet:text-3xl laptop:text-4xl p-2 sm:p-1 tablet:p-4 font-bold leading-relaxed w-full transition-opacity duration-500 ease-in-out">
            {filteredProjects[activeTab]?.title || 'No Title'}
          </h2>

          <div className="relative max-w-4xl mx-auto flex justify-center items-center p-2 sm:p-1">
            {filteredProjects.length > 0 && filteredProjects[activeTab] ? (
              <>
                {filteredProjects[activeTab]?.mainVideo && (
                  <div className="w-full h-0 pb-[56.25%] relative">
                    <YouTube
                      videoId={filteredProjects[activeTab].mainVideo}
                      opts={{
                        width: '100%',
                        height: '100%',
                        playerVars: {
                          autoplay: 1,
                          mute: 1,
                          controls: 1,
                          rel: 0,
                        },
                      }}
                      onReady={(event) => {
                        videoRef.current = event.target;
                        handleVideoLoad(event);
                      }}
                      className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                    />
                  </div>
                )}
                {!filteredProjects[activeTab]?.mainVideo && filteredProjects[activeTab]?.mainImage && (
                  <div className="w-full h-0 pb-[56.25%] relative">
                    <img
                      src={filteredProjects[activeTab].mainImage}
                      alt={filteredProjects[activeTab]?.title || "Project Image"}
                      className="absolute top-0 left-0 w-full h-full object-contain rounded-lg shadow-md"
                    />
                  </div>
                )}
              </>
            ) : (
              <p>No project available.</p>
            )}
          </div>

          <div
            className="mb-10 mt-10 text-lg sm:text-base laptop:text-xl leading-relaxed text-center text-gray-300 px-4 laptop:px-64"
            dangerouslySetInnerHTML={{ __html: filteredProjects[activeTab]?.description || 'No Description' }}
          />

            {filteredProjects[activeTab]?.media?.length > 0 && (
              <div className="flex justify-center w-full">
                <div className="w-3/5 rounded-lg shadow-md">
                  <Splide
                    className="rounded-lg shadow-md"
                    options={{
                      type: 'loop',
                      perPage: 1,
                      arrows: filteredProjects[activeTab]?.media?.length > 1,
                      pagination: false,
                      drag: 'free',
                    }}
                  >
                    {filteredProjects[activeTab]?.media?.map((image, idx) => (
                      <SplideSlide key={idx}>
                        <img
                          src={image}
                          alt={`${filteredProjects[activeTab]?.title} Image ${idx + 1}`}
                          className="w-full h-full object-cover rounded-lg shadow-md"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </SplideSlide>
                    ))}
                  </Splide>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-center justify-center mb-4 bg-transparent p-1 w-full overflow-x-auto">            {otherProjectTypes.map(project => (
              <WorkCard
                key={project.id}
                img={project.media && project.media.length > 0 ? project.media[0] : null}
                name={project.title}
                description={project.description}
                onClick={() => router.push(`/projects/${project.ProjectType.toLowerCase().replace(/\s+/g, '-')}`)}
              />
            ))}
          </div>
        </div>
      )}
      </div>
      
      </main>



      <Footer />
    </div>
  );
};

export default TabbedPortfolio;
