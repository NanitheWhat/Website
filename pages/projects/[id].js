    import ProjectPage from '../../components/Projects/ProjectPage';
import projectsData from '../../data/projects.json';

export async function getStaticPaths() {
  const paths = projectsData.map((project) => ({ params: { id: project.id } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const project = projectsData.find((project) => project.id === params.id);
  return { props: { project } };
}

const Project = ({ project }) => {
  return <ProjectPage project={project} />;
};

export default Project;