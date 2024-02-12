import { IProject, getProjects } from "@/api"
import { GetStaticProps } from "next"
import ProjectPage from "./[project]"
import React, { useState, useEffect } from 'react';
import SplashPage from './splash';


export const getStaticProps: GetStaticProps = async () => {
  const projects = await getProjects()
  return { props: { projects } }
}


export default function Home({ projects }: { projects: IProject[] }) {
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    // Simulate a delay before hiding the splash page
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1000); // Change 3000 to your desired duration in milliseconds

    return () => clearTimeout(timer);
  }, []);
  
  return (
  <div>
    {showSplash ? <SplashPage /> :  <ProjectPage project={projects[0]} projects={projects} />}
  </div>
  )
}