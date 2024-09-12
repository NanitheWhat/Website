import TabbedPortfolio from '../../components/portfolio/portfolio';
import data from '../../data/portfolio.json';

// Generate paths for all project types
export async function getStaticPaths() {
    const types = [...new Set(data.projects.map(project => 
      project.ProjectType.toLowerCase().replace(/\s+/g, '-')
    ))];
    const paths = types.map(type => ({ params: { type } }));
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const projects = data.projects.filter(project => 
      project.ProjectType.toLowerCase().replace(/\s+/g, '-') === params.type.toLowerCase()
    );
    return { props: { projects, projectType: params.type } };
  }

const ProjectType = ({ projects, projectType }) => {
    return <TabbedPortfolio projects={projects} projectType={projectType} />;
  };
  
export default ProjectType;