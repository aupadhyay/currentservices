import { getProjectByName, getProjects } from "@/api";
import Layout from "@/components/Layout";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await getProjects();
  //@ts-ignore
  const paths = projects.map((project) => ({
    params: { project: project.attributes.name },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const project = await getProjectByName(params!.project as string);
  return { props: { project } };
};

const Header = () => (
  <div className="flex justify-between">
    <div>
      <h1 className="text-xl text-white">Current Services</h1>
    </div>
    <div>
      <h1 className="text-xl text-white">Index</h1>
    </div>
  </div>
);

//@ts-ignore
const ProjectPage = ({ project }) => {
  return (
    <div>
      {project.attributes.slides.map((slide) => (
        <Layout color="none" top={<Header />} key={slide.title}>
          <div className="px-24 py-20">
            <p className="text-white text-2xl w-3/4">{slide.description}</p>
          </div>
        </Layout>
      ))}
    </div>
  );
};

export default ProjectPage;
