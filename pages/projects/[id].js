import Portfolio from '../../components/Portfolio/TabbedPortfolio'; // Ensure the path is correct
import projectsData from '../../data/projects.json';

// Generate paths for each project type
export async function getStaticPaths() {
  // Extract unique project types
  const projectTypes = [...new Set(projectsData.map(project => project.ProjectType))];
  const paths = projectTypes.map(type => ({ params: { type } }));
  return { paths, fallback: false };
}

// Fetch data for a specific project type
export async function getStaticProps({ params }) {
  const { type } = params;
  // Filter projects based on type
  const filteredProjects = projectsData.filter(project => project.ProjectType === type);
  return { props: { filteredProjects, type } };
}

// The component to render projects by type
const ProjectTypePage = ({ filteredProjects, type }) => {
  return <Portfolio projects={filteredProjects} type={type} />;
};

export default ProjectTypePage;
