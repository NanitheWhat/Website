import React, { useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import WorkCard from "../components/WorkCard";
import Cursor from "../components/Cursor";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";

const ProjectPage = ({ project }) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const sliderRef = useRef();

  useIsomorphicLayoutEffect(() => {
    stagger(
      [titleRef.current, descriptionRef.current, sliderRef.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, []);

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
    <div className="relative cursor-none">
      <Cursor />
      <Head>
        <title>{project.title} | Clic Media</title>
        <meta name="description" content={project.description} />
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10">
        <Header />
        
        <main className="mt-10 laptop:mt-20">
          <Link href="/">
            <a className="text-xl text-bold mt-10 flex items-center">
              <span className="mr-2">←</span> Back to Home
            </a>
          </Link>

          <div className="mt-10">
            <h1
              ref={titleRef}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {project.title}
            </h1>

            <div ref={sliderRef} className="mt-10 laptop:mt-20 w-full">
              <div className="relative flex justify-center items-center">
                <Button onClick={prevSlide} className="absolute left-0 z-10">
                  &#10094;
                </Button>
                <img
                  src={project.media[currentIndex]}
                  alt={`Project media ${currentIndex + 1}`}
                  className="rounded-lg w-full laptop:w-3/4 h-auto"
                />
                <Button onClick={nextSlide} className="absolute right-0 z-10">
                  &#10095;
                </Button>
              </div>
            </div>

            <p
              ref={descriptionRef}
              className="text-xl laptop:text-3xl w-full laptop:w-3/5 mt-5 text-gray-700"
            >
              {project.description}
            </p>
          </div>

          <div className="mt-10 laptop:mt-30 p-2 laptop:p-0">
            <h2 className="text-2xl text-bold">Related Projects</h2>
            <div className="mt-5 laptop:mt-10 grid grid-cols-1 tablet:grid-cols-2 gap-4">
              {project.relatedProjects.map((related) => (
                <WorkCard
                  key={related.id}
                  img={related.imageSrc}
                  name={related.title}
                  description={related.description}
                  onClick={() => router.push(`/projects/${related.id}`)}
                />
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

// Example of how to get the project data from the JSON file
const getProjectById = (id) => {
  const projectsData = require('/data/projects.json');
  return projectsData.find((project) => project.id === id);
};

// Example usage in a Next.js page
export async function getStaticProps({ params }) {
  const project = getProjectById(params.id);
  return { props: { project } };
}

export async function getStaticPaths() {
  const projectsData = require('/data/projects.json');
  const paths = projectsData.map((project) => ({
    params: { id: project.id.toString() },
  }));

  return { paths, fallback: false };
}

export default ProjectPage;