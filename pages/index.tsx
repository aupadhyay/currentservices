import { IProject, getProjects } from "@/api"
import clsx from "clsx"
import { GetStaticProps } from "next"
import { useEffect, useState } from "react"
import ProjectPage from "./[project]"

// TODO: consider making these configurable in Strapi, along with splash screen bg
const SPLASH_DURATION = 2100
const SPLASH_FADE_DURATION = 600

export const getStaticProps: GetStaticProps = async () => {
  const projects = await getProjects()
  return { props: { projects } }
}

function Splash({ className }: { className?: string }) {
  return (
    <div className={clsx("z-[100] bg-[#FF242F] absolute top-0 bottom-0 w-full h-screen flex justify-center items-center", className)}>
      <div className="text-center text-white">
        &copy; 2024 Current Services &amp; All Parties Mentioned Herein
      </div>
    </div>
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
        setTimeout(() => {
          setFirstLoad(false)
        }, SPLASH_FADE_DURATION)
      }, SPLASH_DURATION)

      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <div>
      {firstLoad && (
        <Splash
          className={
            clearSplash
              ? `ease-in-out opacity-0 transition-opacity duration-[${SPLASH_FADE_DURATION}ms]`
              : ""
          }
        />
      )}
      <ProjectPage project={projects[0]} projects={projects} />
    </div>
  )
}
