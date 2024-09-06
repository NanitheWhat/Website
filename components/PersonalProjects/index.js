import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProjectCard = ({ id, title, description, imageSrc }) => (
  <Link href={`/projects/${id}`}>
    <a className="block">
      <div className="relative aspect-w-16 aspect-h-9 mb-4">
        <img src={imageSrc} alt={title} className="object-cover rounded-lg" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 text-white">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </a>
  </Link>
);

const PersonalProjects = ({ projects }) => {
  return (
    <div>
      <Head>
        <title>Personal Projects | Clic Media</title>
        <meta name="description" content="Personal projects showcase" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Personal Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  // In a real application, you would fetch this data from an API or database
  const projects = [
    { id: 1, title: "Project 1", description: "Description for Project 1", imageSrc: "/path/to/image1.jpg" },
    { id: 2, title: "Project 2", description: "Description for Project 2", imageSrc: "/path/to/image2.jpg" },
    { id: 3, title: "Project 3", description: "Description for Project 3", imageSrc: "/path/to/image3.jpg" },
    { id: 4, title: "Project 4", description: "Description for Project 4", imageSrc: "/path/to/image4.jpg" },
  ];

  return {
    props: {
      projects,
    },
  };
}

export default PersonalProjects;