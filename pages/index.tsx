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
  const [firstLoad, setFirstLoad] = useState(false)
  const [clearSplash, setClearSplash] = useState(false)

  useEffect(() => {
    if (window && window.sessionStorage && window.sessionStorage.getItem('firstLoad') == null) {
      setFirstLoad(true)
      const timer = setTimeout(() => {
        setClearSplash(true)
        window.sessionStorage.setItem('firstLoad', 'false')
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <div>
      {firstLoad && (
        <Splash
          className={
            clearSplash
              ? "ease-in-out opacity-0 transition-opacity duration-1000"
              : ""
          }
        />
      )}
      <ProjectPage project={projects[0]} projects={projects} />
    </div>
  )
}
