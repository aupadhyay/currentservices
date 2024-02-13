import { IProject, getProjects } from "@/api"
import Layout from "@/components/Layout"
import { GetStaticProps } from "next"
import { useEffect, useState } from "react"
import ProjectPage from "./[project]"

export const getStaticProps: GetStaticProps = async () => {
  const projects = await getProjects()
  return { props: { projects } }
}

function Splash({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Layout color="[#FF242F]" top="">
        <div className="py-80 text-center text-white z-60">
          &copy; 2024 Current Services &amp; All Parties Mentioned Herein
        </div>
      </Layout>
    </div>
  )
}

export default function Home({ projects }: { projects: IProject[] }) {
  const [showSplash, setShowSplash] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      <Splash className={showSplash ? 'ease-in-out opacity-0 transition-opacity duration-1000' : ''}/>
      <ProjectPage project={projects[0]} projects={projects} />
    </div>
  )
}
