import { IProject, getProjects } from "@/api"
import { GetStaticProps } from "next"
import ProjectPage from "./[project]"

export const getStaticProps: GetStaticProps = async () => {
  const projects = await getProjects()
  return { props: { projects } }
}

export default function Home({ projects }: { projects: IProject[] }) {
  return <ProjectPage project={projects[0]} projects={projects} />
}