import React from 'react';
import ProjectPage from '../../components/Projects/ProjectPage';

// Simulate a database or API call
const projects = [
  {
    id: '1',
    title: 'Madeira',
    media: ['/images/20221126_142049.jpg', '/images/20221126_142053.jpg'],
    description: "In 2022 Rick travelled to Madeira to capture its beauty.",
    relatedProjects: [
      { id: '2', title: 'Related Project 2' },
      { id: '3', title: 'Related Project 3' }
    ]
  },
  {
    id: '2',
    title: 'Project 2',
    media: ['/images/project2-1.jpg', '/images/project2-2.jpg'],
    description: 'This is the second project.',
    relatedProjects: [
      { id: '1', title: 'Related Project 1' },
      { id: '3', title: 'Related Project 3' }
    ]
  },
  // More projects...
];

const ProjectDetailPage = ({ project }) => {
  return <ProjectPage project={project} />;
};

// Fetch project data based on id
export async function getStaticProps({ params }) {
  const project = projects.find((p) => p.id === params.id); // Replace with real data fetching logic
  return { props: { project } };
}

export async function getStaticPaths() {
  const paths = projects.map((p) => ({
    params: { id: p.id },
  }));
  return { paths, fallback: false };
}

export default ProjectDetailPage;
