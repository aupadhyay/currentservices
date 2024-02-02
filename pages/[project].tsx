import { getProjectByName, getProjects } from '@/api';
import Layout from '@/components/Layout';
import { GetStaticPaths, GetStaticProps } from 'next';

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await getProjects();
  //@ts-ignore
  const paths = projects.data.map((project) => ({
    params: { project: project.attributes.name },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const project = await getProjectByName(params!.project as string);
  return { props: { project } };
}

//@ts-ignore
const ProjectPage = ({ project }) => {
  return (
  <Layout color="none">
    <h1>{JSON.stringify(project)}</h1>
  </Layout>
)};

export default ProjectPage;