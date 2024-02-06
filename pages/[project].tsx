import { getProjectByName, getProjects } from "@/api";
import Layout from "@/components/Layout";
import { GetStaticPaths, GetStaticProps } from "next";
import router from "next/router";
import React, { useState, useEffect } from 'react';


const SlideNumber = () => {
  const [slideNumber, setSlideNumber] = useState(0);

  useEffect(() => {
    const handleClick = () => {
      setSlideNumber((prevCount) => prevCount + 1);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []); 

  return slideNumber;
};

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

const handleClick = () => {
  // Handle the click event, such as logging or performing other actions
  console.log("Link clicked!");
  router.push("/");
};



const Header = () => (
  <div className="flex justify-between">
    <div>
      <h1 className="text-xl text-white" onClick={handleClick}>Current Services</h1>
    </div>
    <div>
      <h1 className="text-xl text-white" onClick={handleClick}>Index</h1>
    </div>
  </div>
);


//@ts-ignore
const ProjectPage = ({ project }) => {
  const slideNumber = SlideNumber();
  return (
    <div>
        <Layout color="none" top={<Header />} key={project.attributes.slides[slideNumber].title}>
          <div className="px-24 py-20">
            <p className="text-white text-2xl w-3/4">{project.attributes.slides[slideNumber].description}</p>
            {"Slide:" + slideNumber}
          </div>
        </Layout>
    </div>
  );
};

export default ProjectPage;
