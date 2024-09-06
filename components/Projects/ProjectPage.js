import React from 'react';
import { Link } from 'next/link'; // for navigation
import { useState } from 'react';

// Import Header and Footer components from your existing setup
import Header from '../Header';
import Footer from '../Footer';

const ProjectPage = ({ project }) => {
  // For handling the slider
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % project.media.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        prevIndex === 0 ? project.media.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Back Arrow */}
      <div className="absolute top-5 left-5">
        <Link href="/">
          <a className="text-xl text-gray-500 hover:text-gray-800">
            ← Back
          </a>
        </Link>
      </div>

      {/* Title */}
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold text-gray-800">{project.title}</h1>
      </div>

      {/* Slider Section */}
      <div className="flex justify-center mt-10">
        <div className="w-3/4 bg-white rounded-lg shadow-md">
          {/* Slider */}
          <div className="relative flex justify-center items-center">
            <button
              onClick={prevSlide}
              className="absolute left-0 bg-gray-700 text-white p-2 rounded-full"
            >
              &#10094;
            </button>
            <img
              src={project.media[currentIndex]}
              alt="Project media"
              className="rounded-lg"
            />
            <button
              onClick={nextSlide}
              className="absolute right-0 bg-gray-700 text-white p-2 rounded-full"
            >
              &#10095;
            </button>
          </div>
        </div>
      </div>

      {/* Text Description */}
      <div className="text-center mt-5 px-5">
        <p className="text-lg text-gray-700">{project.description}</p>
      </div>

      {/* Related Projects Links */}
      <div className="mt-10 flex justify-center">
        <div className="w-3/4 grid grid-cols-3 gap-4">
          {project.relatedProjects.map((related) => (
            <Link key={related.id} href={`/projects/${related.id}`}>
              <a className="text-blue-500 hover:underline">{related.title}</a>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProjectPage;
