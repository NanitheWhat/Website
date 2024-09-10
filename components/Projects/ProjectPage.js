import React, { useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router';
import Header from "../Header";
import Footer from "../Footer";
import Cursor from "../Cursor";
import ProjectCarousel from "../components/ProjectCarousel";  // Import the new carousel
import { useIsomorphicLayoutEffect } from "../../utils";
import { stagger } from "../../animations";

// This function gets the project data by ID
const getProjectById = (id) => {
  const projectsData = require('/data/projects.json');
  return projectsData.find((project) => project.id === id);
};

const ProjectPage = ({ project }) => {
  const router = useRouter();
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
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full text-center"
            >
              {project.title}
            </h1>

            {/* Use ProjectCarousel to display the project media and related projects */}
            <div ref={sliderRef} className="mt-10 laptop:mt-20 w-full h-[500px]">
              <ProjectCarousel project={project} />
            </div>

            <p
              ref={descriptionRef}
              className="text-xl laptop:text-3xl w-full laptop:w-3/5 mt-10 text-gray-700 text-center mx-auto"
            >
              {project.description}
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
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
