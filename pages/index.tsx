import { IProject, getProjects } from "@/api"
import Layout from "@/components/Layout"
import clsx from "clsx"
import { GetStaticProps } from "next"
import { useEffect, useState } from "react"
import ProjectPage from "./[project]"

export const getStaticProps: GetStaticProps = async () => {
  const projects = await getProjects()
  return { props: { projects } }
}

function Splash({ className }: { className?: string }) {
  return (
    <Layout color="[#FF242F]" className={clsx(className, "z-[100]")}>
      <div className="py-80 text-center text-white">
        &copy; 2024 Current Services &amp; All Parties Mentioned Herein
      </div>
    </Layout>
  )
}

export default function Home({ projects }: { projects: IProject[] }) {
  const [firstLoad, setFirstLoad] = useState(false)
  const [clearSplash, setClearSplash] = useState(false)

  useEffect(() => {
    if (
      window &&
      window.sessionStorage &&
      window.sessionStorage.getItem("firstLoad") == null
    ) {
      setFirstLoad(true)
      const timer = setTimeout(() => {
        setClearSplash(true)
        window.sessionStorage.setItem("firstLoad", "false")
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
